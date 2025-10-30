import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RideRequestController::store
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tropiride/ride-request',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RideRequestController::store
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RideRequestController::store
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RideRequestController::store
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RideRequestController::store
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RideRequestController::index
 * @see app/Http/Controllers/RideRequestController.php:125
 * @route '/tropiride/bookings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tropiride/bookings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RideRequestController::index
 * @see app/Http/Controllers/RideRequestController.php:125
 * @route '/tropiride/bookings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RideRequestController::index
 * @see app/Http/Controllers/RideRequestController.php:125
 * @route '/tropiride/bookings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RideRequestController::index
 * @see app/Http/Controllers/RideRequestController.php:125
 * @route '/tropiride/bookings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RideRequestController::index
 * @see app/Http/Controllers/RideRequestController.php:125
 * @route '/tropiride/bookings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RideRequestController::index
 * @see app/Http/Controllers/RideRequestController.php:125
 * @route '/tropiride/bookings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RideRequestController::index
 * @see app/Http/Controllers/RideRequestController.php:125
 * @route '/tropiride/bookings'
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
* @see \App\Http\Controllers\RideRequestController::cancel
 * @see app/Http/Controllers/RideRequestController.php:139
 * @route '/tropiride/bookings/{id}/cancel'
 */
export const cancel = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/tropiride/bookings/{id}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RideRequestController::cancel
 * @see app/Http/Controllers/RideRequestController.php:139
 * @route '/tropiride/bookings/{id}/cancel'
 */
cancel.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return cancel.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RideRequestController::cancel
 * @see app/Http/Controllers/RideRequestController.php:139
 * @route '/tropiride/bookings/{id}/cancel'
 */
cancel.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RideRequestController::cancel
 * @see app/Http/Controllers/RideRequestController.php:139
 * @route '/tropiride/bookings/{id}/cancel'
 */
    const cancelForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RideRequestController::cancel
 * @see app/Http/Controllers/RideRequestController.php:139
 * @route '/tropiride/bookings/{id}/cancel'
 */
        cancelForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const RideRequestController = { store, index, cancel }

export default RideRequestController