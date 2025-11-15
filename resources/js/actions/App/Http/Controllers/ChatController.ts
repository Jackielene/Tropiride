import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tropiride/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ChatController::index
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
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
* @see \App\Http\Controllers\ChatController::driverIndex
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
export const driverIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: driverIndex.url(options),
    method: 'get',
})

driverIndex.definition = {
    methods: ["get","head"],
    url: '/driver/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::driverIndex
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
driverIndex.url = (options?: RouteQueryOptions) => {
    return driverIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::driverIndex
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
driverIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: driverIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::driverIndex
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
driverIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: driverIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ChatController::driverIndex
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
    const driverIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: driverIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ChatController::driverIndex
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
        driverIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: driverIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ChatController::driverIndex
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
        driverIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: driverIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    driverIndex.form = driverIndexForm
/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:30
 * @route '/chat/bookings/{booking}/messages'
 */
export const messages = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: messages.url(args, options),
    method: 'get',
})

messages.definition = {
    methods: ["get","head"],
    url: '/chat/bookings/{booking}/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:30
 * @route '/chat/bookings/{booking}/messages'
 */
messages.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return messages.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:30
 * @route '/chat/bookings/{booking}/messages'
 */
messages.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: messages.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:30
 * @route '/chat/bookings/{booking}/messages'
 */
messages.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: messages.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:30
 * @route '/chat/bookings/{booking}/messages'
 */
    const messagesForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: messages.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:30
 * @route '/chat/bookings/{booking}/messages'
 */
        messagesForm.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: messages.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:30
 * @route '/chat/bookings/{booking}/messages'
 */
        messagesForm.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: messages.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    messages.form = messagesForm
/**
* @see \App\Http\Controllers\ChatController::store
 * @see app/Http/Controllers/ChatController.php:55
 * @route '/chat/bookings/{booking}/messages'
 */
export const store = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/chat/bookings/{booking}/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatController::store
 * @see app/Http/Controllers/ChatController.php:55
 * @route '/chat/bookings/{booking}/messages'
 */
store.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::store
 * @see app/Http/Controllers/ChatController.php:55
 * @route '/chat/bookings/{booking}/messages'
 */
store.post = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChatController::store
 * @see app/Http/Controllers/ChatController.php:55
 * @route '/chat/bookings/{booking}/messages'
 */
    const storeForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChatController::store
 * @see app/Http/Controllers/ChatController.php:55
 * @route '/chat/bookings/{booking}/messages'
 */
        storeForm.post = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const ChatController = { index, driverIndex, messages, store }

export default ChatController