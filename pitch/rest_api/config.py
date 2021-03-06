REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_FILTER_BACKENDS': ['rest_framework.filters.SearchFilter',
                                'rest_framework.filters.OrderingFilter'],
    'SEARCH_PARAM': 'q',
    'ORDERING_PARAM': 'ord'
}
