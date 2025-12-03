import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TropirideProfileController::update
 * @see app/Http/Controllers/TropirideProfileController.php:69
 * @route '/tropiride/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/tropiride/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TropirideProfileController::update
 * @see app/Http/Controllers/TropirideProfileController.php:69
 * @route '/tropiride/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TropirideProfileController::update
 * @see app/Http/Controllers/TropirideProfileController.php:69
 * @route '/tropiride/profile'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TropirideProfileController::update
 * @see app/Http/Controllers/TropirideProfileController.php:69
 * @route '/tropiride/profile'
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
* @see \App\Http\Controllers\TropirideProfileController::update
 * @see app/Http/Controllers/TropirideProfileController.php:69
 * @route '/tropiride/profile'
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
* @see \App\Http\Controllers\TropirideProfileController::avatar
 * @see app/Http/Controllers/TropirideProfileController.php:113
 * @route '/tropiride/profile/avatar'
 */
export const avatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

avatar.definition = {
    methods: ["post"],
    url: '/tropiride/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TropirideProfileController::avatar
 * @see app/Http/Controllers/TropirideProfileController.php:113
 * @route '/tropiride/profile/avatar'
 */
avatar.url = (options?: RouteQueryOptions) => {
    return avatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TropirideProfileController::avatar
 * @see app/Http/Controllers/TropirideProfileController.php:113
 * @route '/tropiride/profile/avatar'
 */
avatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TropirideProfileController::avatar
 * @see app/Http/Controllers/TropirideProfileController.php:113
 * @route '/tropiride/profile/avatar'
 */
    const avatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: avatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TropirideProfileController::avatar
 * @see app/Http/Controllers/TropirideProfileController.php:113
 * @route '/tropiride/profile/avatar'
 */
        avatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: avatar.url(options),
            method: 'post',
        })
    
    avatar.form = avatarForm
const profile = {
    update: Object.assign(update, update),
avatar: Object.assign(avatar, avatar),
}

export default profile