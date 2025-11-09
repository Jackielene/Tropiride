import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
export const verification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verification.url(options),
    method: 'post',
})

verification.definition = {
    methods: ["post"],
    url: '/driver/profile/resubmit-verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
verification.url = (options?: RouteQueryOptions) => {
    return verification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
verification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verification.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
    const verificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verification.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
        verificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verification.url(options),
            method: 'post',
        })
    
    verification.form = verificationForm
const resubmit = {
    verification: Object.assign(verification, verification),
}

export default resubmit