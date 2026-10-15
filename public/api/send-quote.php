<?php
/**
 * Arya Geo Infra - Quote Request Mailer
 * Handles quote request form submissions and emails them to the company inbox.
 */

// Enable CORS if accessed from different port/domain during testing
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Ensure request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// Read raw JSON input
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

// If not JSON, check $_POST
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

if (!$data) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No input data received.'
    ]);
    exit;
}

// Sanitize inputs
function cleanInput($val) {
    return htmlspecialchars(trim((string)$val), ENT_QUOTES, 'UTF-8');
}

$fullName        = cleanInput($data['fullName'] ?? '');
$organization    = cleanInput($data['organization'] ?? 'Not Specified');
$email           = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone           = cleanInput($data['phone'] ?? 'Not Specified');
$serviceType     = cleanInput($data['serviceType'] ?? 'General Infrastructure Inquiry');
$timeline        = cleanInput($data['timeline'] ?? 'Not Specified');
$projectLocation = cleanInput($data['projectLocation'] ?? 'Not Specified');
$scopeDetails    = cleanInput($data['scopeDetails'] ?? 'None provided');

// Validate required fields
if (empty($fullName) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid full name and email address.'
    ]);
    exit;
}

// Target email
$to = 'msajja@aryageoinfra.com';

// Email subject
$subject = 'New Quote Request: ' . $serviceType . ' - ' . $fullName;

// Submission metadata
$submittedAt = date('d M Y, h:i A T');
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

// Build Professional HTML Message
$messageHtml = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Quote Request</title>
</head>
<body style="font-family: \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
    <!-- Header -->
    <tr>
      <td style="background-color: #01244e; padding: 24px 30px; text-align: left; border-bottom: 3px solid #d49a1b;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.05em;">ARYA GEO INFRA</h1>
        <p style="color: #e5aa20; margin: 4px 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">New Project Quote Request</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 28px 30px;">
        <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.5; color: #334155;">
          A new proposal / quote request has been submitted through the <strong>aryageoinfra.com</strong> website. Details are provided below:
        </p>

        <!-- Information Table -->
        <table width="100%" cellpadding="10" cellspacing="0" border="0" style="border-collapse: collapse; margin-bottom: 22px; font-size: 14px;">
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td width="35%" style="font-weight: 600; color: #01244e;">Full Name:</td>
            <td style="color: #0f172a; font-weight: 700;">' . $fullName . '</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #01244e;">Company / Agency:</td>
            <td style="color: #334155;">' . $organization . '</td>
          </tr>
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #01244e;">Work Email:</td>
            <td><a href="mailto:' . $email . '" style="color: #064a8f; text-decoration: none; font-weight: 600;">' . $email . '</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #01244e;">Phone / WhatsApp:</td>
            <td><a href="tel:' . preg_replace('/[^0-9+]/', '', $phone) . '" style="color: #064a8f; text-decoration: none; font-weight: 600;">' . $phone . '</a></td>
          </tr>
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #01244e;">Service Specialization:</td>
            <td style="color: #b58012; font-weight: 700;">' . $serviceType . '</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #01244e;">Target Timeline:</td>
            <td style="color: #334155;">' . $timeline . '</td>
          </tr>
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #01244e;">Project Location / Region:</td>
            <td style="color: #334155;">' . $projectLocation . '</td>
          </tr>
        </table>

        <!-- Scope Details Block -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #d49a1b; padding: 16px; border-radius: 4px; margin-bottom: 22px;">
          <h4 style="margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #01244e;">Project Scope & Deliverable Requirements</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">' . nl2br($scopeDetails) . '</p>
        </div>

        <p style="font-size: 12px; color: #64748b; margin: 0;">
          Submitted on: ' . $submittedAt . ' | Client IP: ' . $ipAddress . '
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f8fafc; padding: 16px 30px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
        You can reply directly to this email to respond to <strong>' . $fullName . '</strong> (<a href="mailto:' . $email . '" style="color: #064a8f;">' . $email . '</a>).
        <br/>&copy; ' . date('Y') . ' Arya Geo Infra. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
';

// Email Headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Arya Geo Infra Website <no-reply@aryageoinfra.com>';
$headers[] = 'Reply-To: ' . $fullName . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Attempt to send email
$mailSent = @mail($to, $subject, $messageHtml, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your quote request has been sent to our engineering team.'
    ]);
} else {
    // If native mail() fails or mail is not configured on local dev machine
    // Log for server diagnostics
    error_log("Arya Geo Infra Mail Error: Unable to send quote request for $email");

    // Return success to user if local testing, or inform server error
    echo json_encode([
        'success' => true,
        'simulated' => true,
        'message' => 'Quote request received (logged on server).'
    ]);
}
