import attr
from marshmallow3_annotations.ext.attrs import AttrsSchema
from flask_login import UserMixin


@attr.s(auto_attribs=True, kw_only=True)
class User(UserMixin):
    name: str = attr.ib()
    email: str = attr.ib()
    role: str = attr.ib()


class UserSchema(AttrsSchema):
    class Meta:
        target = User
        register_as_scheme = True


class UserRoles:
    ADMIN = 'admin'
    DEFAULT = 'default'
