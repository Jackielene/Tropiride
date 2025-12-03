import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import driver from './driver'
/**
* @see \App\Http\Controllers\GpsTrackingController::update
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/gps/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GpsTrackingController::update
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GpsTrackingController::update
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GpsTrackingController::update
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GpsTrackingController::update
 * @see app/Http/Controllers/GpsTrackingController.php:18
 * @route '/gps/update'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\GpsTrackingController::stop
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
export const stop = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(options),
    method: 'post',
})

stop.definition = {
    methods: ["post"],
    url: '/gps/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GpsTrackingController::stop
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
stop.url = (options?: RouteQueryOptions) => {
    return stop.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GpsTrackingController::stop
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
stop.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GpsTrackingController::stop
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
    const stopForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: stop.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GpsTrackingController::stop
 * @see app/Http/Controllers/GpsTrackingController.php:89
 * @route '/gps/stop'
 */
        stopForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: stop.url(options),
            method: 'post',
        })
    
    stop.form = stopForm
const gps = {
    update: Object.assign(update, update),
stop: Object.assign(stop, stop),
driver: Object.assign(driver, driver),
}

export default gps