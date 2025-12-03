import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import profile from './profile'
import booking from './booking'
import password from './password'
import twoFactor from './two-factor'
/**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/driver/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:18
 * @route '/driver/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:248
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
 * @see app/Http/Controllers/DriverDashboardController.php:248
 * @route '/driver/rides'
 */
rides.url = (options?: RouteQueryOptions) => {
    return rides.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:248
 * @route '/driver/rides'
 */
rides.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rides.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:248
 * @route '/driver/rides'
 */
rides.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rides.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:248
 * @route '/driver/rides'
 */
    const ridesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rides.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:248
 * @route '/driver/rides'
 */
        ridesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rides.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DriverDashboardController::rides
 * @see app/Http/Controllers/DriverDashboardController.php:248
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
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
export const messages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: messages.url(options),
    method: 'get',
})

messages.definition = {
    methods: ["get","head"],
    url: '/driver/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
messages.url = (options?: RouteQueryOptions) => {
    return messages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
messages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: messages.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
messages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: messages.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
    const messagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: messages.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
        messagesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: messages.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:22
 * @route '/driver/messages'
 */
        messagesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: messages.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    messages.form = messagesForm
/**
 * @see routes/web.php:239
 * @route '/driver/debug'
 */
export const debug = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: debug.url(options),
    method: 'get',
})

debug.definition = {
    methods: ["get","head"],
    url: '/driver/debug',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:239
 * @route '/driver/debug'
 */
debug.url = (options?: RouteQueryOptions) => {
    return debug.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:239
 * @route '/driver/debug'
 */
debug.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: debug.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:239
 * @route '/driver/debug'
 */
debug.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: debug.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:239
 * @route '/driver/debug'
 */
    const debugForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: debug.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:239
 * @route '/driver/debug'
 */
        debugForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: debug.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:239
 * @route '/driver/debug'
 */
        debugForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: debug.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    debug.form = debugForm
const driver = {
    dashboard: Object.assign(dashboard, dashboard),
rides: Object.assign(rides, rides),
messages: Object.assign(messages, messages),
debug: Object.assign(debug, debug),
profile: Object.assign(profile, profile),
booking: Object.assign(booking, booking),
password: Object.assign(password, password),
twoFactor: Object.assign(twoFactor, twoFactor),
}

export default driver