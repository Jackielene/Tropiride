import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DriverProfileController::front
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
export const front = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: front.url(options),
    method: 'post',
})

front.definition = {
    methods: ["post"],
    url: '/driver/profile/license-front',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::front
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
front.url = (options?: RouteQueryOptions) => {
    return front.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::front
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
front.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: front.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::front
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
    const frontForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: front.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::front
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
        frontForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: front.url(options),
            method: 'post',
        })
    
    front.form = frontForm
/**
* @see \App\Http\Controllers\DriverProfileController::back
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
export const back = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: back.url(options),
    method: 'post',
})

back.definition = {
    methods: ["post"],
    url: '/driver/profile/license-back',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::back
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
back.url = (options?: RouteQueryOptions) => {
    return back.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::back
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
back.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: back.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::back
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
    const backForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: back.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::back
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
        backForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: back.url(options),
            method: 'post',
        })
    
    back.form = backForm
const license = {
    front: Object.assign(front, front),
back: Object.assign(back, back),
}

export default license