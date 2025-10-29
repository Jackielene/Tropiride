import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TropirideProfileController::show
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tropiride/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TropirideProfileController::show
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TropirideProfileController::show
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TropirideProfileController::show
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TropirideProfileController::show
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TropirideProfileController::show
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TropirideProfileController::show
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\TropirideProfileController::update
 * @see app/Http/Controllers/TropirideProfileController.php:66
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
 * @see app/Http/Controllers/TropirideProfileController.php:66
 * @route '/tropiride/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TropirideProfileController::update
 * @see app/Http/Controllers/TropirideProfileController.php:66
 * @route '/tropiride/profile'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TropirideProfileController::update
 * @see app/Http/Controllers/TropirideProfileController.php:66
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
 * @see app/Http/Controllers/TropirideProfileController.php:66
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
* @see \App\Http\Controllers\TropirideProfileController::updateAvatar
 * @see app/Http/Controllers/TropirideProfileController.php:110
 * @route '/tropiride/profile/avatar'
 */
export const updateAvatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.definition = {
    methods: ["post"],
    url: '/tropiride/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TropirideProfileController::updateAvatar
 * @see app/Http/Controllers/TropirideProfileController.php:110
 * @route '/tropiride/profile/avatar'
 */
updateAvatar.url = (options?: RouteQueryOptions) => {
    return updateAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TropirideProfileController::updateAvatar
 * @see app/Http/Controllers/TropirideProfileController.php:110
 * @route '/tropiride/profile/avatar'
 */
updateAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TropirideProfileController::updateAvatar
 * @see app/Http/Controllers/TropirideProfileController.php:110
 * @route '/tropiride/profile/avatar'
 */
    const updateAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAvatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TropirideProfileController::updateAvatar
 * @see app/Http/Controllers/TropirideProfileController.php:110
 * @route '/tropiride/profile/avatar'
 */
        updateAvatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAvatar.url(options),
            method: 'post',
        })
    
    updateAvatar.form = updateAvatarForm
const TropirideProfileController = { show, update, updateAvatar }

export default TropirideProfileController