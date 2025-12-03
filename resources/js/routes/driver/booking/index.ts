import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DriverDashboardController::accept
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
export const accept = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

accept.definition = {
    methods: ["post"],
    url: '/driver/bookings/{bookingId}/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverDashboardController::accept
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
accept.url = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bookingId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    bookingId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bookingId: args.bookingId,
                }

    return accept.definition.url
            .replace('{bookingId}', parsedArgs.bookingId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::accept
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
accept.post = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::accept
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
    const acceptForm = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: accept.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::accept
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
        acceptForm.post = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: accept.url(args, options),
            method: 'post',
        })
    
    accept.form = acceptForm
/**
* @see \App\Http\Controllers\DriverDashboardController::status
 * @see app/Http/Controllers/DriverDashboardController.php:225
 * @route '/driver/bookings/{bookingId}/status'
 */
export const status = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/driver/bookings/{bookingId}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DriverDashboardController::status
 * @see app/Http/Controllers/DriverDashboardController.php:225
 * @route '/driver/bookings/{bookingId}/status'
 */
status.url = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bookingId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    bookingId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bookingId: args.bookingId,
                }

    return status.definition.url
            .replace('{bookingId}', parsedArgs.bookingId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::status
 * @see app/Http/Controllers/DriverDashboardController.php:225
 * @route '/driver/bookings/{bookingId}/status'
 */
status.patch = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::status
 * @see app/Http/Controllers/DriverDashboardController.php:225
 * @route '/driver/bookings/{bookingId}/status'
 */
    const statusForm = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::status
 * @see app/Http/Controllers/DriverDashboardController.php:225
 * @route '/driver/bookings/{bookingId}/status'
 */
        statusForm.patch = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
const booking = {
    accept: Object.assign(accept, accept),
status: Object.assign(status, status),
}

export default booking