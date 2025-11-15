import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import messages4ba6e9 from './messages'
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
const chat = {
    messages: Object.assign(messages, messages4ba6e9),
}

export default chat