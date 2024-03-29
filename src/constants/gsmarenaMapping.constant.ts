export const GSMARENA_ATTRIBUTES_MAPPING = {
    'General Info' : {
        'Launched' : {
            field : 'Launch.Announced',
        },
        'Operation system' : {
            field : 'Platform.OS',
        },
        'Dimensions' : {
            field : 'Body.Dimensions',
        },
        'Weight' : {
            field : 'Body.Weight',
        },
        'SIM' : {
            field : 'Body.SIM',
        },
    },
    'Basics' : {
        CPU : {
            field : 'Platform.OS',
        },
        Internal : {
            field : 'Memory.Internal',
        },
    },
    'Display' : {
        Type: {
            field : 'Display.Type',
        },
        Resolution: {
            field : 'Display.Resolution',
        },
    },
    'Main camera' : {
        Single: {
            field : 'MainCamera.Single',
        },
        Video: {
            field : 'MainCamera.Video',
        },
    },
    'Selfie camera' : {
        Single: {
            field : 'Selfiecamera.Single',
        },
        Video: {
            field : 'Selfiecamera.Video',
        },
    },
    'Battery' : {
        Capacity: {
            field : 'Battery.0',
        },
        Technology: {
            field : 'Battery.Charging',
        },
    },
}
