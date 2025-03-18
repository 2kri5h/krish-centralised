import random
import string
import base64
import hashlib
import os

# Generate code_verifier
code_verifier = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(random.randint(43, 128)))

# Generate code_challenge
code_challenge = hashlib.sha256(code_verifier.encode('utf-8')).digest()
code_challenge = base64.urlsafe_b64encode(code_challenge).decode('utf-8').replace('=', '')

# Print values
print(f"CODE_VERIFIER: {code_verifier}")
print(f"CODE_CHALLENGE: {code_challenge}")