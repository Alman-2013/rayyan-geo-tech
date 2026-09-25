import { NextResponse } from "next/server";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();

    const {
      name,
      phone,
      email,
      requirement,
      location,
      details,
    } = body;

    if (!name || !phone || !requirement || !details) {
      return NextResponse.json(
        {
          error:
            "Please fill in Name, Phone, Survey Requirement and Project Details.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "RGT Website <onboarding@resend.dev>",
      to: ["rgtdronsurvey@gmail.com"],
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
              <h1 style="margin-top:0;color:#123e2c;">
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
                <strong>Name:</strong><br />
                ${escapeHtml(name)}
              </p>

              <p>
                <strong>Phone:</strong><br />
                ${escapeHtml(phone)}
              </p>

              <p>
                <strong>Email:</strong><br />
                ${escapeHtml(email || "Not provided")}
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

              <hr
                style="
                  border:0;
                  border-top:1px solid #e5e9e5;
                  margin:25px 0;
                "
              />

              <p style="font-size:13px;color:#7b857e;">
                Submitted from the Rayyan Geo Tech website.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);

      return NextResponse.json(
        {
          error:
            error.message ||
            "Resend could not send the enquiry email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry sent successfully.",
      id: data?.id,
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}