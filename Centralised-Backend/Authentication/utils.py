import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class Util:
    @staticmethod
    def send_email(to_email, subject, html_content):
        try:
            # SMTP server details
            SMTP_SERVER = "smtp-auth.iitb.ac.in"
            SMTP_PORT = 587
            SMTP_USERNAME = "sarc@iitb.ac.in"
            SMTP_PASSWORD = "87638c40a92a794bc81b6de03e5ae86c"
            
            # Create a multipart message
            msg = MIMEMultipart()
            msg['From'] = SMTP_USERNAME
            msg['To'] = to_email
            msg['Subject'] = subject
            
            # Add HTML content
            msg.attach(MIMEText(html_content, 'html'))
            
            # Connect to SMTP server
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()  # Secure the connection
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            
            # Send email
            server.send_message(msg)
            server.quit()
            
            print(f"Email sent successfully to {to_email}")
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
    
    @staticmethod
    def get_verification_email_html(user_name, verification_link):
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Verify Your Email</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .container {{
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 20px;
                }}
                .header {{
                    background-color: #6EACDA;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                    margin-bottom: 20px;
                }}
                .button {{
                    display: inline-block;
                    background-color: #6EACDA;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }}
                .footer {{
                    margin-top: 30px;
                    font-size: 12px;
                    color: #777;
                    text-align: center;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Verify Your Email</h1>
                </div>
                
                <p>Hello {user_name},</p>
                
                <p>Thank you for registering with SARC IIT Bombay. To complete your registration, please verify your email address by clicking the button below:</p>
                
                <p style="text-align: center;">
                    <a href="{verification_link}" class="button">Verify Email</a>
                </p>
                
                <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                
                <p style="word-break: break-all;">{verification_link}</p>
                
                <p>This link will expire in 24 hours for security reasons.</p>
                
                <p>If you did not create an account, please ignore this email.</p>
                
                <p>Best regards,<br>
                SARC IIT Bombay Team</p>
                
                <div class="footer">
                    <p>This is an automated email. Please do not reply to this message.</p>
                    <p>&copy; 2025 SARC IIT Bombay. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
    
    @staticmethod
    def get_password_reset_email_html(user_name, reset_link):
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Reset Your Password</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .container {{
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 20px;
                }}
                .header {{
                    background-color: #6EACDA;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                    margin-bottom: 20px;
                }}
                .button {{
                    display: inline-block;
                    background-color: #6EACDA;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin: 20px 0;
                }}
                .footer {{
                    margin-top: 30px;
                    font-size: 12px;
                    color: #777;
                    text-align: center;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Reset Your Password</h1>
                </div>
                
                <p>Hello {user_name},</p>
                
                <p>We received a request to reset your password for your SARC IIT Bombay account. To reset your password, please click the button below:</p>
                
                <p style="text-align: center;">
                    <a href="{reset_link}" class="button">Reset Password</a>
                </p>
                
                <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                
                <p style="word-break: break-all;">{reset_link}</p>
                
                <p>This link will expire in 24 hours for security reasons.</p>
                
                <p>If you did not request a password reset, please ignore this email or contact us if you have questions.</p>
                
                <p>Best regards,<br>
                SARC IIT Bombay Team</p>
                
                <div class="footer">
                    <p>This is an automated email. Please do not reply to this message.</p>
                    <p>&copy; 2025 SARC IIT Bombay. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """