import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GpsTrackingController::updateLocation
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
export const updateLocation = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateLocation.url(options),
    method: 'post',
})

updateLocation.definition = {
    methods: ["post"],
    url: '/gps/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GpsTrackingController::updateLocation
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
updateLocation.url = (options?: RouteQueryOptions) => {
    return updateLocation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GpsTrackingController::updateLocation
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
updateLocation.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateLocation.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GpsTrackingController::updateLocation
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
    const updateLocationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateLocation.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GpsTrackingController::updateLocation
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
        updateLocationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateLocation.url(options),
            method: 'post',
        })
    
    updateLocation.form = updateLocationForm
/**
* @see \App\Http\Controllers\GpsTrackingController::stopTracking
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
export const stopTracking = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stopTracking.url(options),
    method: 'post',
})

stopTracking.definition = {
    methods: ["post"],
    url: '/gps/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GpsTrackingController::stopTracking
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
stopTracking.url = (options?: RouteQueryOptions) => {
    return stopTracking.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GpsTrackingController::stopTracking
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
stopTracking.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stopTracking.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GpsTrackingController::stopTracking
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
    const stopTrackingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: stopTracking.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GpsTrackingController::stopTracking
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
        stopTrackingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: stopTracking.url(options),
            method: 'post',
        })
    
    stopTracking.form = stopTrackingForm
/**
* @see \App\Http\Controllers\GpsTrackingController::getDriverLocation
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
export const getDriverLocation = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDriverLocation.url(args, options),
    method: 'get',
})

getDriverLocation.definition = {
    methods: ["get","head"],
    url: '/gps/booking/{booking}/location',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GpsTrackingController::getDriverLocation
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
getDriverLocation.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { booking: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { booking: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    booking: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        booking: typeof args.booking === 'object'
                ? args.booking.id
                : args.booking,
                }

    return getDriverLocation.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GpsTrackingController::getDriverLocation
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
getDriverLocation.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDriverLocation.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GpsTrackingController::getDriverLocation
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
getDriverLocation.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDriverLocation.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GpsTrackingController::getDriverLocation
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
    const getDriverLocationForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getDriverLocation.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GpsTrackingController::getDriverLocation
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
        getDriverLocationForm.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDriverLocation.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GpsTrackingController::getDriverLocation
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
        getDriverLocationForm.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDriverLocation.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getDriverLocation.form = getDriverLocationForm
/**
* @see \App\Http\Controllers\GpsTrackingController::trackingPage
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
export const trackingPage = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trackingPage.url(args, options),
    method: 'get',
})

trackingPage.definition = {
    methods: ["get","head"],
    url: '/tropiride/tracking/{booking}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GpsTrackingController::trackingPage
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
trackingPage.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { booking: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { booking: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    booking: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        booking: typeof args.booking === 'object'
                ? args.booking.id
                : args.booking,
                }

    return trackingPage.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GpsTrackingController::trackingPage
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
trackingPage.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trackingPage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GpsTrackingController::trackingPage
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
trackingPage.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trackingPage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GpsTrackingController::trackingPage
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
    const trackingPageForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: trackingPage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GpsTrackingController::trackingPage
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
        trackingPageForm.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trackingPage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GpsTrackingController::trackingPage
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
        trackingPageForm.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trackingPage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    trackingPage.form = trackingPageForm
const GpsTrackingController = { updateLocation, stopTracking, getDriverLocation, trackingPage }

export default GpsTrackingController