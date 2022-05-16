
from flask_login import LoginManager, login_required, current_user
from app.model.user import User
login_manager = LoginManager()

# Adding typing to current user
current_user: User = current_user
