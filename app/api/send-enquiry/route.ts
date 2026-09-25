import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

const apiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Check Resend API key
    // --------------------------------------------------
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "RESEND_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 2. Get the currently logged-in Supabase customer
    // --------------------------------------------------
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Please login before submitting an enquiry.",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 3. Read enquiry form
    // --------------------------------------------------
    const body = await request.json();

    const {
      name,
      phone,
      email,
      requirement,
      location,
      details,
    } = body;

    // --------------------------------------------------
    // 4. Validate required fields
    // --------------------------------------------------
    if (!name || !phone || !requirement || !details) {
      return NextResponse.json(
        {
          error:
            "Please fill in Name, Phone, Survey Requirement and Project Details.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 5. Save enquiry to Supabase
    // --------------------------------------------------
    const { data: enquiry, error: databaseError } = await supabase
      .from("enquiries")
      .insert({
        user_id: user.id,
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : user.email ?? null,
        requirement: String(requirement).trim(),
        location: location ? String(location).trim() : null,
        details: String(details).trim(),
        status: "Pending",
      })
      .select()
      .single();

    if (databaseError) {
      console.error("SUPABASE ENQUIRY ERROR:", databaseError);

      return NextResponse.json(
        {
          error:
            databaseError.message ||
            "Could not save your enquiry.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 6. Send enquiry email to RGT
    // --------------------------------------------------
    const resend = new Resend(apiKey);

    const { data: emailData, error: emailError } =
      await resend.emails.send({
        from: "RGT Website <onboarding@resend.dev>",
        to: ["rgtdronesurvey@gmail.com"],
        subject: `New RGT Survey Enquiry - ${name}`,

        html: `
          <!DOCTYPE html>
          <html>
            <body
              style="
                margin:0;
                padding:30px;
                background:#f4f7f4;
                font-family:Arial,sans-serif;
                color:#17231d;
              "
            >
              <div
                style="
                  max-width:700px;
                  margin:auto;
                  background:white;
                  border-radius:16px;
                  padding:30px;
                "
              >

                <h1
                  style="
                    margin-top:0;
                    color:#123e2c;
                  "
                >
                  New RGT Survey Enquiry
                </h1>

                <p style="color:#66716a;">
                  A new enquiry was submitted through the RGT website.
                </p>

                <hr
                  style="
                    border:0;
                    border-top:1px solid #e5e9e5;
                    margin:25px 0;
                  "
                />

                <h3>Customer Information</h3>

                <p>
                  <strong>Customer Account:</strong><br />
                  ${escapeHtml(user.email || "Not provided")}
                </p>

                <p>
                  <strong>Name:</strong><br />
                  ${escapeHtml(name)}
                </p>

                <p>
                  <strong>Phone:</strong><br />
                  ${escapeHtml(phone)}
                </p>

                <p>
                  <strong>Email:</strong><br />
                  ${escapeHtml(email || user.email || "Not provided")}
                </p>

                <p>
                  <strong>Survey Requirement:</strong><br />
                  ${escapeHtml(requirement)}
                </p>

                <p>
                  <strong>Project Location:</strong><br />
                  ${escapeHtml(location || "Not provided")}
                </p>

                <h3>Project Details</h3>

                <div
                  style="
                    background:#f5f8f5;
                    padding:18px;
                    border-radius:10px;
                    line-height:1.7;
                  "
                >
                  ${escapeHtml(details).replace(/\n/g, "<br />")}
                </div>

                <h3>Enquiry Information</h3>

                <p>
                  <strong>Enquiry ID:</strong><br />
                  ${escapeHtml(enquiry.id)}
                </p>

                <p>
                  <strong>Status:</strong><br />
                  Pending
                </p>

                <hr
                  style="
                    border:0;
                    border-top:1px solid #e5e9e5;
                    margin:25px 0;
                  "
                />

                <p
                  style="
                    font-size:13px;
                    color:#7b857e;
                  "
                >
                  Submitted from the Rayyan Geo Tech customer portal.
                </p>

              </div>
            </body>
          </html>
        `,
      });

    if (emailError) {
      console.error("RESEND ERROR:", emailError);

      return NextResponse.json(
        {
          success: true,
          saved: true,
          emailSent: false,
          message:
            "Your enquiry was saved successfully, but the notification email could not be sent.",
          enquiryId: enquiry.id,
          emailError: emailError.message,
        },
        { status: 200 }
      );
    }

    // --------------------------------------------------
    // 7. Success
    // --------------------------------------------------
    return NextResponse.json({
      success: true,
      saved: true,
      emailSent: true,
      message: "Enquiry submitted successfully.",
      enquiryId: enquiry.id,
      emailId: emailData?.id,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error: "An unexpected server error occurred.",
      },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// HTML safety
// --------------------------------------------------
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}