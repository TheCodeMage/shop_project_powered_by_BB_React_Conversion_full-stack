from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .api_views import CategoryViewSet, ProductViewSet, CartItemViewSet, UserAuthView, UserRegisterView

# Create a router for API endpoints
router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'cart', CartItemViewSet, basename='cart')

urlpatterns = [
    # Home & Shop
    path('', views.home, name='home'),
    path('shop/', views.shop, name='shop'),
    path('shop/product/<int:product_id>/', views.product_detail, name='product_detail'),

    # Cart
    path('cart/', views.view_cart, name='view_cart'),
    path('cart/add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('cart/update/<int:item_id>/', views.update_quantity, name='update_quantity'),
    path('cart/remove-item/<int:item_id>/', views.remove_item, name='remove_item'),
    path('cart/checkout/', views.checkout, name='checkout'),
    path('cart/add-with-quantity/<int:product_id>/', views.add_to_cart_with_quantity, name='add_to_cart_with_quantity'),
    path('cart/count/', views.get_cart_count, name='get_cart_count'),

    # API Endpoints
    path('api/', include(router.urls)),
    path('api/auth/login/', UserAuthView.as_view(), name='api_login'),
    path('api/auth/register/', UserRegisterView.as_view(), name='api_register'),

    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
