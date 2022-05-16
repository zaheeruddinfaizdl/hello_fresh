import attr
from marshmallow3_annotations.ext.attrs import AttrsSchema


@attr.s(auto_attribs=True, kw_only=True)
class Rating:
    # resource_id: str = attr.ib()
    # user_id: str = attr.ib()
    rating: int = attr.ib()
    review: str = attr.ib(default="")


class RatingSchema(AttrsSchema):
    class Meta:
        target = Rating
        register_as_schema = True


@attr.s(auto_attribs=True, kw_only=True)
class RatingWithUserDetails:
    # resource_id: str = attr.ib()
    # user_id: str = attr.ib()
    rating: int = attr.ib()
    review: str = attr.ib(default="")


class RatingWithUserDetailsSchema(AttrsSchema):
    class Meta:
        target = RatingWithUserDetails
        register_as_schema = True
