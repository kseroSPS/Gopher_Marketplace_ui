from django.urls import path
from . import views

urlpatterns = [
    path('', views.sign_in, name='sign_in'),
    path('sign-out', views.sign_out, name='sign_out'),
    path('auth-receiver', views.auth_receiver, name='auth_receiver'),
    path('api/usercredentials/', views.get_user_credentials, name='user_credentials'),
    # path('api/authentication', views.auth_receiver1, name='authentication'),
    # path('auth', views.auth_receiverjs, name= 'auth')
]