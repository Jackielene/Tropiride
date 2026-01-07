import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import license from './license'
import submit from './submit'
import resubmit from './resubmit'
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
* @see \App\Http\Controllers\DriverProfileController::avatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
export const avatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

avatar.definition = {
    methods: ["post"],
    url: '/driver/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DriverProfileController::avatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
avatar.url = (options?: RouteQueryOptions) => {
    return avatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverProfileController::avatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
avatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DriverProfileController::avatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
    const avatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: avatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DriverProfileController::avatar
 * @see app/Http/Controllers/DriverProfileController.php:51
 * @route '/driver/profile/avatar'
 */
        avatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: avatar.url(options),
            method: 'post',
        })
    
    avatar.form = avatarForm
const profile = {
    update: Object.assign(update, update),
avatar: Object.assign(avatar, avatar),
license: Object.assign(license, license),
submit: Object.assign(submit, submit),
resubmit: Object.assign(resubmit, resubmit),
}

export default profile