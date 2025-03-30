from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, phone_number=None, roll_number=None, hostel_number=None, password2=None, is_verified=False):
        """
        Creates and saves a User with the given email, name, and password.
        Other fields are optional.
        """
        if not email:
            raise ValueError("User must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            phone_number=phone_number,
            roll_number=roll_number,
            hostel_number=hostel_number,
            is_verified=is_verified,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, phone_number=None, roll_number=None, hostel_number=None):
        """
        Creates and saves a superuser with the given email, name, and password.
        Other fields are optional.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
            phone_number=phone_number,
            roll_number=roll_number,
            hostel_number=hostel_number
        )
        user.is_admin = True
        user.is_verified = True
        user.save(using=self._db)
        return user
    
# Custom User Model
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    roll_number = models.CharField(max_length=20, blank=True, null=True)
    hostel_number = models.CharField(max_length=10, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin