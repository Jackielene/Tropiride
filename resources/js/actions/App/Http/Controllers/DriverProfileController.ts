import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DriverProfileController::update
 * @see app/Http/Controllers/DriverProfileController.php:14
 * @route '/driver/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/driver/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DriverProfileController::update
 * @see app/Http/Controllers/DriverProfileController.php:14
 * @route '/driver/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::update
 * @see app/Http/Controllers/DriverProfileController.php:14
 * @route '/driver/profile'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::update
 * @see app/Http/Controllers/DriverProfileController.php:14
 * @route '/driver/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::update
 * @see app/Http/Controllers/DriverProfileController.php:14
 * @route '/driver/profile'
 */
        updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\DriverProfileController::updateAvatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
export const updateAvatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.definition = {
    methods: ["post"],
    url: '/driver/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::updateAvatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
updateAvatar.url = (options?: RouteQueryOptions) => {
    return updateAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::updateAvatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
updateAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::updateAvatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
    const updateAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAvatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::updateAvatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
        updateAvatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAvatar.url(options),
            method: 'post',
        })
    
    updateAvatar.form = updateAvatarForm
/**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseFront
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
export const uploadLicenseFront = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLicenseFront.url(options),
    method: 'post',
})

uploadLicenseFront.definition = {
    methods: ["post"],
    url: '/driver/profile/license-front',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseFront
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
uploadLicenseFront.url = (options?: RouteQueryOptions) => {
    return uploadLicenseFront.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseFront
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
uploadLicenseFront.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLicenseFront.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseFront
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
    const uploadLicenseFrontForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadLicenseFront.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseFront
 * @see app/Http/Controllers/DriverProfileController.php:96
 * @route '/driver/profile/license-front'
 */
        uploadLicenseFrontForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadLicenseFront.url(options),
            method: 'post',
        })
    
    uploadLicenseFront.form = uploadLicenseFrontForm
/**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseBack
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
export const uploadLicenseBack = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLicenseBack.url(options),
    method: 'post',
})

uploadLicenseBack.definition = {
    methods: ["post"],
    url: '/driver/profile/license-back',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseBack
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
uploadLicenseBack.url = (options?: RouteQueryOptions) => {
    return uploadLicenseBack.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseBack
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
uploadLicenseBack.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLicenseBack.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseBack
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
    const uploadLicenseBackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadLicenseBack.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::uploadLicenseBack
 * @see app/Http/Controllers/DriverProfileController.php:141
 * @route '/driver/profile/license-back'
 */
        uploadLicenseBackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadLicenseBack.url(options),
            method: 'post',
        })
    
    uploadLicenseBack.form = uploadLicenseBackForm
/**
* @see \App\Http\Controllers\DriverProfileController::submitForVerification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
export const submitForVerification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitForVerification.url(options),
    method: 'post',
})

submitForVerification.definition = {
    methods: ["post"],
    url: '/driver/profile/submit-verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::submitForVerification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
submitForVerification.url = (options?: RouteQueryOptions) => {
    return submitForVerification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::submitForVerification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
submitForVerification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitForVerification.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::submitForVerification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
    const submitForVerificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitForVerification.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::submitForVerification
 * @see app/Http/Controllers/DriverProfileController.php:186
 * @route '/driver/profile/submit-verification'
 */
        submitForVerificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitForVerification.url(options),
            method: 'post',
        })
    
    submitForVerification.form = submitForVerificationForm
/**
* @see \App\Http\Controllers\DriverProfileController::resubmitVerification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
export const resubmitVerification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resubmitVerification.url(options),
    method: 'post',
})

resubmitVerification.definition = {
    methods: ["post"],
    url: '/driver/profile/resubmit-verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::resubmitVerification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
resubmitVerification.url = (options?: RouteQueryOptions) => {
    return resubmitVerification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::resubmitVerification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
resubmitVerification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resubmitVerification.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::resubmitVerification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
    const resubmitVerificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resubmitVerification.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::resubmitVerification
 * @see app/Http/Controllers/DriverProfileController.php:208
 * @route '/driver/profile/resubmit-verification'
 */
        resubmitVerificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resubmitVerification.url(options),
            method: 'post',
        })
    
    resubmitVerification.form = resubmitVerificationForm
const DriverProfileController = { update, updateAvatar, uploadLicenseFront, uploadLicenseBack, submitForVerification, resubmitVerification }

export default DriverProfileController