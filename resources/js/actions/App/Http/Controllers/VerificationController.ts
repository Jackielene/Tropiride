import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VerificationController::index
 * @see app/Http/Controllers/VerificationController.php:16
 * @route '/admin/verifications'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/verifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VerificationController::index
 * @see app/Http/Controllers/VerificationController.php:16
 * @route '/admin/verifications'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationController::index
 * @see app/Http/Controllers/VerificationController.php:16
 * @route '/admin/verifications'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VerificationController::index
 * @see app/Http/Controllers/VerificationController.php:16
 * @route '/admin/verifications'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VerificationController::index
 * @see app/Http/Controllers/VerificationController.php:16
 * @route '/admin/verifications'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VerificationController::index
 * @see app/Http/Controllers/VerificationController.php:16
 * @route '/admin/verifications'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VerificationController::index
 * @see app/Http/Controllers/VerificationController.php:16
 * @route '/admin/verifications'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\VerificationController::show
 * @see app/Http/Controllers/VerificationController.php:102
 * @route '/admin/verifications/{userId}'
 */
export const show = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/verifications/{userId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VerificationController::show
 * @see app/Http/Controllers/VerificationController.php:102
 * @route '/admin/verifications/{userId}'
 */
show.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    userId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        userId: args.userId,
                }

    return show.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationController::show
 * @see app/Http/Controllers/VerificationController.php:102
 * @route '/admin/verifications/{userId}'
 */
show.get = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VerificationController::show
 * @see app/Http/Controllers/VerificationController.php:102
 * @route '/admin/verifications/{userId}'
 */
show.head = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VerificationController::show
 * @see app/Http/Controllers/VerificationController.php:102
 * @route '/admin/verifications/{userId}'
 */
    const showForm = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VerificationController::show
 * @see app/Http/Controllers/VerificationController.php:102
 * @route '/admin/verifications/{userId}'
 */
        showForm.get = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VerificationController::show
 * @see app/Http/Controllers/VerificationController.php:102
 * @route '/admin/verifications/{userId}'
 */
        showForm.head = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\VerificationController::approve
 * @see app/Http/Controllers/VerificationController.php:131
 * @route '/admin/verifications/{userId}/approve'
 */
export const approve = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/verifications/{userId}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VerificationController::approve
 * @see app/Http/Controllers/VerificationController.php:131
 * @route '/admin/verifications/{userId}/approve'
 */
approve.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    userId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        userId: args.userId,
                }

    return approve.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationController::approve
 * @see app/Http/Controllers/VerificationController.php:131
 * @route '/admin/verifications/{userId}/approve'
 */
approve.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VerificationController::approve
 * @see app/Http/Controllers/VerificationController.php:131
 * @route '/admin/verifications/{userId}/approve'
 */
    const approveForm = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VerificationController::approve
 * @see app/Http/Controllers/VerificationController.php:131
 * @route '/admin/verifications/{userId}/approve'
 */
        approveForm.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\VerificationController::reject
 * @see app/Http/Controllers/VerificationController.php:154
 * @route '/admin/verifications/{userId}/reject'
 */
export const reject = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/verifications/{userId}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VerificationController::reject
 * @see app/Http/Controllers/VerificationController.php:154
 * @route '/admin/verifications/{userId}/reject'
 */
reject.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    userId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        userId: args.userId,
                }

    return reject.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationController::reject
 * @see app/Http/Controllers/VerificationController.php:154
 * @route '/admin/verifications/{userId}/reject'
 */
reject.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VerificationController::reject
 * @see app/Http/Controllers/VerificationController.php:154
 * @route '/admin/verifications/{userId}/reject'
 */
    const rejectForm = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VerificationController::reject
 * @see app/Http/Controllers/VerificationController.php:154
 * @route '/admin/verifications/{userId}/reject'
 */
        rejectForm.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
/**
* @see \App\Http\Controllers\VerificationController::revoke
 * @see app/Http/Controllers/VerificationController.php:177
 * @route '/admin/verifications/{userId}/revoke'
 */
export const revoke = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

revoke.definition = {
    methods: ["post"],
    url: '/admin/verifications/{userId}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VerificationController::revoke
 * @see app/Http/Controllers/VerificationController.php:177
 * @route '/admin/verifications/{userId}/revoke'
 */
revoke.url = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { userId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    userId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        userId: args.userId,
                }

    return revoke.definition.url
            .replace('{userId}', parsedArgs.userId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VerificationController::revoke
 * @see app/Http/Controllers/VerificationController.php:177
 * @route '/admin/verifications/{userId}/revoke'
 */
revoke.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VerificationController::revoke
 * @see app/Http/Controllers/VerificationController.php:177
 * @route '/admin/verifications/{userId}/revoke'
 */
    const revokeForm = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VerificationController::revoke
 * @see app/Http/Controllers/VerificationController.php:177
 * @route '/admin/verifications/{userId}/revoke'
 */
        revokeForm.post = (args: { userId: string | number } | [userId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke.url(args, options),
            method: 'post',
        })
    
    revoke.form = revokeForm
const VerificationController = { index, show, approve, reject, revoke }

export default VerificationController