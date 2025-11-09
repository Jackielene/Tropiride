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
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::update
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:30
 * @route '/driver/settings/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/driver/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::update
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:30
 * @route '/driver/settings/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::update
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:30
 * @route '/driver/settings/profile'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::update
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:30
 * @route '/driver/settings/profile'
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
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::update
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:30
 * @route '/driver/settings/profile'
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
/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::edit
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:19
 * @route '/driver/settings/profile'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/driver/settings/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::edit
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:19
 * @route '/driver/settings/profile'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::edit
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:19
 * @route '/driver/settings/profile'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::edit
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:19
 * @route '/driver/settings/profile'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::edit
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:19
 * @route '/driver/settings/profile'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::edit
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:19
 * @route '/driver/settings/profile'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::edit
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:19
 * @route '/driver/settings/profile'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::destroy
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:46
 * @route '/driver/settings/profile'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/driver/settings/profile',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::destroy
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:46
 * @route '/driver/settings/profile'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::destroy
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:46
 * @route '/driver/settings/profile'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::destroy
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:46
 * @route '/driver/settings/profile'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Driver\Settings\DriverProfileController::destroy
 * @see app/Http/Controllers/Driver/Settings/DriverProfileController.php:46
 * @route '/driver/settings/profile'
 */
        destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const profile = {
    update: Object.assign(update, update),
avatar: Object.assign(avatar, avatar),
license: Object.assign(license, license),
submit: Object.assign(submit, submit),
resubmit: Object.assign(resubmit, resubmit),
edit: Object.assign(edit, edit),
destroy: Object.assign(destroy, destroy),
}

export default profile