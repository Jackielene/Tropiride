import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
export const verification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verification.url(options),
    method: 'post',
})

verification.definition = {
    methods: ["post"],
    url: '/driver/profile/submit-verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
verification.url = (options?: RouteQueryOptions) => {
    return verification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
verification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verification.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
    const verificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verification.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::verification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
        verificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verification.url(options),
            method: 'post',
        })
    
    verification.form = verificationForm
const submit = {
    verification: Object.assign(verification, verification),
}

export default submit