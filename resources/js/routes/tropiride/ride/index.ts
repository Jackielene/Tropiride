import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RideRequestController::request
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
export const request = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: request.url(options),
    method: 'post',
})

request.definition = {
    methods: ["post"],
    url: '/tropiride/ride-request',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RideRequestController::request
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
request.url = (options?: RouteQueryOptions) => {
    return request.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RideRequestController::request
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
request.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: request.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RideRequestController::request
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
    const requestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: request.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RideRequestController::request
 * @see app/Http/Controllers/RideRequestController.php:15
 * @route '/tropiride/ride-request'
 */
        requestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: request.url(options),
            method: 'post',
        })
    
    request.form = requestForm
const ride = {
    request: Object.assign(request, request),
}

export default ride