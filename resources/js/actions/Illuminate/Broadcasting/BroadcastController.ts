import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
const authenticate95142b6115a9d019b8204096de0eb7b5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authenticate95142b6115a9d019b8204096de0eb7b5.url(options),
    method: 'get',
})

authenticate95142b6115a9d019b8204096de0eb7b5.definition = {
    methods: ["get","post","head"],
    url: '/broadcasting/auth',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
authenticate95142b6115a9d019b8204096de0eb7b5.url = (options?: RouteQueryOptions) => {
    return authenticate95142b6115a9d019b8204096de0eb7b5.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
authenticate95142b6115a9d019b8204096de0eb7b5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authenticate95142b6115a9d019b8204096de0eb7b5.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
authenticate95142b6115a9d019b8204096de0eb7b5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate95142b6115a9d019b8204096de0eb7b5.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
authenticate95142b6115a9d019b8204096de0eb7b5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: authenticate95142b6115a9d019b8204096de0eb7b5.url(options),
    method: 'head',
})

    /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
    const authenticate95142b6115a9d019b8204096de0eb7b5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: authenticate95142b6115a9d019b8204096de0eb7b5.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
        authenticate95142b6115a9d019b8204096de0eb7b5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authenticate95142b6115a9d019b8204096de0eb7b5.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
        authenticate95142b6115a9d019b8204096de0eb7b5Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: authenticate95142b6115a9d019b8204096de0eb7b5.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/broadcasting/auth'
 */
        authenticate95142b6115a9d019b8204096de0eb7b5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authenticate95142b6115a9d019b8204096de0eb7b5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    authenticate95142b6115a9d019b8204096de0eb7b5.form = authenticate95142b6115a9d019b8204096de0eb7b5Form
    /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
const authenticate7e6d5e884dedc4c100d439e039b017c3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authenticate7e6d5e884dedc4c100d439e039b017c3.url(options),
    method: 'get',
})

authenticate7e6d5e884dedc4c100d439e039b017c3.definition = {
    methods: ["get","post","head"],
    url: '/api/broadcasting/auth',
} satisfies RouteDefinition<["get","post","head"]>

/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
authenticate7e6d5e884dedc4c100d439e039b017c3.url = (options?: RouteQueryOptions) => {
    return authenticate7e6d5e884dedc4c100d439e039b017c3.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
authenticate7e6d5e884dedc4c100d439e039b017c3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: authenticate7e6d5e884dedc4c100d439e039b017c3.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
authenticate7e6d5e884dedc4c100d439e039b017c3.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate7e6d5e884dedc4c100d439e039b017c3.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
authenticate7e6d5e884dedc4c100d439e039b017c3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: authenticate7e6d5e884dedc4c100d439e039b017c3.url(options),
    method: 'head',
})

    /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
    const authenticate7e6d5e884dedc4c100d439e039b017c3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: authenticate7e6d5e884dedc4c100d439e039b017c3.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
        authenticate7e6d5e884dedc4c100d439e039b017c3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authenticate7e6d5e884dedc4c100d439e039b017c3.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
        authenticate7e6d5e884dedc4c100d439e039b017c3Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: authenticate7e6d5e884dedc4c100d439e039b017c3.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Broadcasting\BroadcastController::authenticate
 * @see vendor/laravel/framework/src/Illuminate/Broadcasting/BroadcastController.php:18
 * @route '/api/broadcasting/auth'
 */
        authenticate7e6d5e884dedc4c100d439e039b017c3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: authenticate7e6d5e884dedc4c100d439e039b017c3.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    authenticate7e6d5e884dedc4c100d439e039b017c3.form = authenticate7e6d5e884dedc4c100d439e039b017c3Form

export const authenticate = {
    '/broadcasting/auth': authenticate95142b6115a9d019b8204096de0eb7b5,
    '/api/broadcasting/auth': authenticate7e6d5e884dedc4c100d439e039b017c3,
}

const BroadcastController = { authenticate }

export default BroadcastController