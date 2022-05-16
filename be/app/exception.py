
class ResourceAlreadyExistsException(Exception):
    pass


class TokenInvalidException(Exception):
    pass

class TokenExpiredException(Exception):
    pass


class UnAuthorizedException(Exception):
    pass


class BadRequestException(Exception):
    pass


class NotFoundException(Exception):
    pass
