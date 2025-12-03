import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\GpsTrackingController::location
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
export const location = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location.url(args, options),
    method: 'get',
})

location.definition = {
    methods: ["get","head"],
    url: '/gps/booking/{booking}/location',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GpsTrackingController::location
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
location.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return location.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GpsTrackingController::location
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
location.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: location.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GpsTrackingController::location
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
location.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: location.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GpsTrackingController::location
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
    const locationForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: location.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GpsTrackingController::location
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
        locationForm.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: location.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GpsTrackingController::location
 * @see app/Http/Controllers/GpsTrackingController.php:108
 * @route '/gps/booking/{booking}/location'
 */
        locationForm.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: location.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    location.form = locationForm
const driver = {
    location: Object.assign(location, location),
}

export default driver