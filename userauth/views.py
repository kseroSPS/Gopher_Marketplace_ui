from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests
from decouple import config
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
import logging
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

logger = logging.getLogger(__name__)

def sign_in(request):
    """Render the sign-in page with Google OAuth button."""
    if request.user.is_authenticated:
        return redirect('market/')
    return render(request, 'userauth/sign_in.html')

@csrf_exempt  # Only for Google OAuth callback
# def auth_receiver(request):
#     """Handle Google OAuth callback and create/update user in database."""
#     token = request.POST.get('credential')
    
#     if not token:
#         logger.error("Missing credential in POST data")
#         return HttpResponse("Missing credential in the POST data.", status=400)
    
#     try:
#         # Verify the Google OAuth token
#         user_data = id_token.verify_oauth2_token(
#             token, 
#             requests.Request(), 
#             config('CLIENT_ID')
#         )
        
#         # Extract user information from Google data
#         email = user_data['email']
#         first_name = user_data.get('given_name', '')
#         last_name = user_data.get('family_name', '')
        
#         # Try to get existing user or create new one
#         try:
#             user = User.objects.get(email=email)
#             # Update existing user's information
#             user.first_name = first_name
#             user.last_name = last_name
#             user.save()
#             logger.info(f"Existing user logged in: {email}")
#         except User.DoesNotExist:
#             # Create new user
#             username = email.split('@')[0]  # Use email prefix as username
#             # Handle username conflicts
#             base_username = username
#             counter = 1
#             while User.objects.filter(username=username).exists():
#                 username = f"{base_username}{counter}"
#                 counter += 1
            
#             user = User.objects.create_user(
#                 username=username,
#                 email=email,
#                 first_name=first_name,
#                 last_name=last_name
#             )
#             logger.info(f"New user created: {email}")
        
#         # Create or get authentication token
#         token, _ = Token.objects.get_or_create(user=user)
        
#         # Log the user in
#         login(request, user)
        
#         # Store additional user data in session if needed
#         request.session['user_data'] = {
#             'email': email,
#             'first_name': first_name,
#             'last_name': last_name,
#             'picture': user_data.get('picture', ''),
#             'auth_token': token.key
#         }
        
#         return redirect('market/')
        
#     except ValueError as e:
#         logger.error(f"Token verification failed: {str(e)}")
#         return HttpResponse("Invalid token", status=403)
#     except Exception as e:
#         logger.error(f"Authentication error: {str(e)}")
#         return HttpResponse("Authentication failed", status=500)
    



def auth_receiver(request):
    """Handle Google OAuth callback and create/update user in database."""
    try:
        # Debugging: Log incoming request data
        print("Request method:", request.method)
        print("Request body:", request.body)
        print("Request POST data:", request.POST)

        # Ensure request is POST
        if request.method != "POST":
            return JsonResponse({"error": "Invalid request method"}, status=405)

        # Extract token from POST data
        token = request.POST.get('credential')
        if not token:
            logger.error("Missing credential in POST data")
            return JsonResponse({"error": "Missing credential"}, status=400)

        # Verify the Google OAuth token
        try:
            user_data = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                config('CLIENT_ID')  # Ensure this matches your frontend client ID
            )
            logger.info("Token successfully verified")
            logger.debug(f"User data from token: {user_data}")
        except ValueError as e:
            logger.error(f"Token verification failed: {str(e)}")
            return JsonResponse({"error": "Invalid token"}, status=403)

        # Extract user information
        email = user_data['email']
        first_name = user_data.get('given_name', '')
        last_name = user_data.get('family_name', '')
        username = email.split('@')[0]

        # Debugging: Log user details
        logger.debug(f"Email: {email}, First Name: {first_name}, Last Name: {last_name}")

        # Try to get or create user
        try:
            user = User.objects.get(email=email)
            # Update existing user's information
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            logger.info(f"Existing user logged in: {email}")
        except User.DoesNotExist:
            # Handle username conflicts
            username = email.split('@')[0]
            base_username = username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
            
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name
            )
            logger.info(f"New user created: {email}")

        # Create or get authentication token
        auth_token, _ = Token.objects.get_or_create(user=user)

        # Log the user in
        login(request, user)

        # Store user data in session
        request.session['user_data'] = {
            'auth_token': auth_token.key,
            "user_name":username,
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'picture': user_data.get('picture', ''),
        }
        print(request.session['user_data'])
        logger.info(f"User session created for: {email}")
        # return redirect('market/')
        return JsonResponse({"message": "Login successful", "auth_token": auth_token.key, "user_data":  request.session['user_data']})

    except Exception as e:
        logger.error(f"Unexpected error in auth_receiver: {str(e)}")
        return JsonResponse({"error": "Internal server error"}, status=500)
    
def auth_receiver1(request):
    """Handle Google OAuth callback and create/update user in database."""
    token = request.POST.get('credential')
    
    if not token:
        logger.error("Missing credential in POST data")
        return JsonResponse({"error": "Missing credential in the POST data."}, status=400)
    
    try:
        # Verify the Google OAuth token
        user_data = id_token.verify_oauth2_token(
            token, 
            requests.Request(), 
            config('CLIENT_ID')
        )
        
        # Extract user information from Google data
        email = user_data['email']
        first_name = user_data.get('given_name', '')
        last_name = user_data.get('family_name', '')
        
        # Try to get existing user or create new one
        try:
            user = User.objects.get(email=email)
            # Update existing user's information
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            logger.info(f"Existing user logged in: {email}")
        except User.DoesNotExist:
            # Create new user
            username = email.split('@')[0]  # Use email prefix as username
            # Handle username conflicts
            base_username = username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
            
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name
            )
            logger.info(f"New user created: {email}")
        
        # Create or get authentication token
        token, _ = Token.objects.get_or_create(user=user)
        
        # Log the user in
        login(request, user)
        
        # Store additional user data in session if needed
        request.session['user_data'] = {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'picture': user_data.get('picture', ''),
            'auth_token': token.key,
        }
        
        # Return token and user info as JSON
        return JsonResponse({
            "auth_token": token.key,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "picture": user_data.get('picture', ''),
        })
    
    except ValueError as e:
        logger.error(f"Token verification failed: {str(e)}")
        return JsonResponse({"error": "Invalid token"}, status=403)
    except Exception as e:
        logger.error(f"Authentication error: {str(e)}")
        return JsonResponse({"error": "Authentication failed"}, status=500)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_credentials(request):
    """Retrieve the current user's credentials."""
    user_data = {
        "id": request.user.id,
        "email": request.user.email,
        "first_name": request.user.first_name,
        "last_name": request.user.last_name,
    }
    return JsonResponse(user_data, status=200)
def sign_out(request):
    """Handle user sign out."""
    if 'user_data' in request.session:
        del request.session['user_data']
    logout(request)
    return redirect('sign_in')
