import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DriverDashboardController::index
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/driver/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DriverDashboardController::index
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::index
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DriverDashboardController::index
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::index
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::index
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DriverDashboardController::index
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:219
 * @route '/driver/rides'
 */
export const rides = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rides.url(options),
    method: 'get',
})

rides.definition = {
    methods: ["get","head"],
    url: '/driver/rides',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:219
 * @route '/driver/rides'
 */
rides.url = (options?: RouteQueryOptions) => {
    return rides.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:219
 * @route '/driver/rides'
 */
rides.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rides.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:219
 * @route '/driver/rides'
 */
rides.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rides.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:219
 * @route '/driver/rides'
 */
    const ridesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rides.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:219
 * @route '/driver/rides'
 */
        ridesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rides.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:219
 * @route '/driver/rides'
 */
        ridesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rides.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rides.form = ridesForm
/**
* @see \App\Http\Controllers\DriverDashboardController::acceptBooking
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
export const acceptBooking = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acceptBooking.url(args, options),
    method: 'post',
})

acceptBooking.definition = {
    methods: ["post"],
    url: '/driver/bookings/{bookingId}/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverDashboardController::acceptBooking
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
acceptBooking.url = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return acceptBooking.definition.url
            .replace('{bookingId}', parsedArgs.bookingId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::acceptBooking
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
acceptBooking.post = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: acceptBooking.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::acceptBooking
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
    const acceptBookingForm = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: acceptBooking.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::acceptBooking
 * @see app/Http/Controllers/DriverDashboardController.php:133
 * @route '/driver/bookings/{bookingId}/accept'
 */
        acceptBookingForm.post = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: acceptBooking.url(args, options),
            method: 'post',
        })
    
    acceptBooking.form = acceptBookingForm
/**
* @see \App\Http\Controllers\DriverDashboardController::updateBookingStatus
 * @see app/Http/Controllers/DriverDashboardController.php:196
 * @route '/driver/bookings/{bookingId}/status'
 */
export const updateBookingStatus = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateBookingStatus.url(args, options),
    method: 'patch',
})

updateBookingStatus.definition = {
    methods: ["patch"],
    url: '/driver/bookings/{bookingId}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DriverDashboardController::updateBookingStatus
 * @see app/Http/Controllers/DriverDashboardController.php:196
 * @route '/driver/bookings/{bookingId}/status'
 */
updateBookingStatus.url = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateBookingStatus.definition.url
            .replace('{bookingId}', parsedArgs.bookingId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::updateBookingStatus
 * @see app/Http/Controllers/DriverDashboardController.php:196
 * @route '/driver/bookings/{bookingId}/status'
 */
updateBookingStatus.patch = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateBookingStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::updateBookingStatus
 * @see app/Http/Controllers/DriverDashboardController.php:196
 * @route '/driver/bookings/{bookingId}/status'
 */
    const updateBookingStatusForm = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateBookingStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::updateBookingStatus
 * @see app/Http/Controllers/DriverDashboardController.php:196
 * @route '/driver/bookings/{bookingId}/status'
 */
        updateBookingStatusForm.patch = (args: { bookingId: string | number } | [bookingId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateBookingStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateBookingStatus.form = updateBookingStatusForm
const DriverDashboardController = { index, rides, acceptBooking, updateBookingStatus }

export default DriverDashboardController