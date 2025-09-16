LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'gan_data_generator': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}