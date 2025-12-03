import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import profile937a89 from './profile'
import booking99ab18 from './booking'
import ride from './ride'
import bookings743b13 from './bookings'
/**
 * @see routes/web.php:33
 * @route '/tropiride'
 */
export const landing = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: landing.url(options),
    method: 'get',
})

landing.definition = {
    methods: ["get","head"],
    url: '/tropiride',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:33
 * @route '/tropiride'
 */
landing.url = (options?: RouteQueryOptions) => {
    return landing.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:33
 * @route '/tropiride'
 */
landing.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: landing.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:33
 * @route '/tropiride'
 */
landing.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: landing.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:33
 * @route '/tropiride'
 */
    const landingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: landing.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:33
 * @route '/tropiride'
 */
        landingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: landing.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:33
 * @route '/tropiride'
 */
        landingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: landing.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    landing.form = landingForm
/**
 * @see routes/web.php:37
 * @route '/tropiride/about'
 */
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/tropiride/about',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:37
 * @route '/tropiride/about'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:37
 * @route '/tropiride/about'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:37
 * @route '/tropiride/about'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:37
 * @route '/tropiride/about'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:37
 * @route '/tropiride/about'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:37
 * @route '/tropiride/about'
 */
        aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    about.form = aboutForm
/**
 * @see routes/web.php:41
 * @route '/tropiride/contact'
 */
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/tropiride/contact',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:41
 * @route '/tropiride/contact'
 */
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:41
 * @route '/tropiride/contact'
 */
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:41
 * @route '/tropiride/contact'
 */
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:41
 * @route '/tropiride/contact'
 */
    const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contact.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:41
 * @route '/tropiride/contact'
 */
        contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:41
 * @route '/tropiride/contact'
 */
        contactForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contact.form = contactForm
/**
 * @see routes/web.php:45
 * @route '/tropiride/faq'
 */
export const faq = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faq.url(options),
    method: 'get',
})

faq.definition = {
    methods: ["get","head"],
    url: '/tropiride/faq',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:45
 * @route '/tropiride/faq'
 */
faq.url = (options?: RouteQueryOptions) => {
    return faq.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:45
 * @route '/tropiride/faq'
 */
faq.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faq.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:45
 * @route '/tropiride/faq'
 */
faq.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: faq.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:45
 * @route '/tropiride/faq'
 */
    const faqForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: faq.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:45
 * @route '/tropiride/faq'
 */
        faqForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: faq.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:45
 * @route '/tropiride/faq'
 */
        faqForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: faq.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    faq.form = faqForm
/**
 * @see routes/web.php:49
 * @route '/tropiride/privacy'
 */
export const privacy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})

privacy.definition = {
    methods: ["get","head"],
    url: '/tropiride/privacy',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:49
 * @route '/tropiride/privacy'
 */
privacy.url = (options?: RouteQueryOptions) => {
    return privacy.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:49
 * @route '/tropiride/privacy'
 */
privacy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:49
 * @route '/tropiride/privacy'
 */
privacy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacy.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:49
 * @route '/tropiride/privacy'
 */
    const privacyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: privacy.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:49
 * @route '/tropiride/privacy'
 */
        privacyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:49
 * @route '/tropiride/privacy'
 */
        privacyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    privacy.form = privacyForm
/**
 * @see routes/web.php:53
 * @route '/tropiride/terms'
 */
export const terms = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})

terms.definition = {
    methods: ["get","head"],
    url: '/tropiride/terms',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:53
 * @route '/tropiride/terms'
 */
terms.url = (options?: RouteQueryOptions) => {
    return terms.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:53
 * @route '/tropiride/terms'
 */
terms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:53
 * @route '/tropiride/terms'
 */
terms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: terms.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:53
 * @route '/tropiride/terms'
 */
    const termsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: terms.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:53
 * @route '/tropiride/terms'
 */
        termsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:53
 * @route '/tropiride/terms'
 */
        termsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    terms.form = termsForm
/**
* @see \App\Http\Controllers\TropirideProfileController::profile
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})

profile.definition = {
    methods: ["get","head"],
    url: '/tropiride/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TropirideProfileController::profile
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TropirideProfileController::profile
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
profile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TropirideProfileController::profile
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
profile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profile.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TropirideProfileController::profile
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
    const profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: profile.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TropirideProfileController::profile
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
        profileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profile.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TropirideProfileController::profile
 * @see app/Http/Controllers/TropirideProfileController.php:17
 * @route '/tropiride/profile'
 */
        profileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    profile.form = profileForm
/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
export const messages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: messages.url(options),
    method: 'get',
})

messages.definition = {
    methods: ["get","head"],
    url: '/tropiride/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
messages.url = (options?: RouteQueryOptions) => {
    return messages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
messages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: messages.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
messages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: messages.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
    const messagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: messages.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
        messagesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: messages.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ChatController::messages
 * @see app/Http/Controllers/ChatController.php:14
 * @route '/tropiride/messages'
 */
        messagesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: messages.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    messages.form = messagesForm
/**
 * @see routes/web.php:106
 * @route '/tropiride/vehicles'
 */
export const vehicles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vehicles.url(options),
    method: 'get',
})

vehicles.definition = {
    methods: ["get","head"],
    url: '/tropiride/vehicles',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:106
 * @route '/tropiride/vehicles'
 */
vehicles.url = (options?: RouteQueryOptions) => {
    return vehicles.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:106
 * @route '/tropiride/vehicles'
 */
vehicles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vehicles.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:106
 * @route '/tropiride/vehicles'
 */
vehicles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vehicles.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:106
 * @route '/tropiride/vehicles'
 */
    const vehiclesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: vehicles.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:106
 * @route '/tropiride/vehicles'
 */
        vehiclesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: vehicles.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:106
 * @route '/tropiride/vehicles'
 */
        vehiclesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: vehicles.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    vehicles.form = vehiclesForm
/**
 * @see routes/web.php:111
 * @route '/tropiride/booking'
 */
export const booking = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: booking.url(options),
    method: 'get',
})

booking.definition = {
    methods: ["get","head"],
    url: '/tropiride/booking',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:111
 * @route '/tropiride/booking'
 */
booking.url = (options?: RouteQueryOptions) => {
    return booking.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:111
 * @route '/tropiride/booking'
 */
booking.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: booking.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:111
 * @route '/tropiride/booking'
 */
booking.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: booking.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:111
 * @route '/tropiride/booking'
 */
    const bookingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: booking.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:111
 * @route '/tropiride/booking'
 */
        bookingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: booking.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:111
 * @route '/tropiride/booking'
 */
        bookingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: booking.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    booking.form = bookingForm
/**
* @see \App\Http\Controllers\RideRequestController::bookings
 * @see app/Http/Controllers/RideRequestController.php:138
 * @route '/tropiride/bookings'
 */
export const bookings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bookings.url(options),
    method: 'get',
})

bookings.definition = {
    methods: ["get","head"],
    url: '/tropiride/bookings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RideRequestController::bookings
 * @see app/Http/Controllers/RideRequestController.php:138
 * @route '/tropiride/bookings'
 */
bookings.url = (options?: RouteQueryOptions) => {
    return bookings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RideRequestController::bookings
 * @see app/Http/Controllers/RideRequestController.php:138
 * @route '/tropiride/bookings'
 */
bookings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bookings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RideRequestController::bookings
 * @see app/Http/Controllers/RideRequestController.php:138
 * @route '/tropiride/bookings'
 */
bookings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bookings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RideRequestController::bookings
 * @see app/Http/Controllers/RideRequestController.php:138
 * @route '/tropiride/bookings'
 */
    const bookingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bookings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RideRequestController::bookings
 * @see app/Http/Controllers/RideRequestController.php:138
 * @route '/tropiride/bookings'
 */
        bookingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bookings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RideRequestController::bookings
 * @see app/Http/Controllers/RideRequestController.php:138
 * @route '/tropiride/bookings'
 */
        bookingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bookings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bookings.form = bookingsForm
/**
 * @see routes/web.php:144
 * @route '/tropiride/confirmation'
 */
export const confirmation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})

confirmation.definition = {
    methods: ["get","head"],
    url: '/tropiride/confirmation',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:144
 * @route '/tropiride/confirmation'
 */
confirmation.url = (options?: RouteQueryOptions) => {
    return confirmation.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:144
 * @route '/tropiride/confirmation'
 */
confirmation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:144
 * @route '/tropiride/confirmation'
 */
confirmation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:144
 * @route '/tropiride/confirmation'
 */
    const confirmationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: confirmation.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:144
 * @route '/tropiride/confirmation'
 */
        confirmationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmation.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:144
 * @route '/tropiride/confirmation'
 */
        confirmationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmation.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    confirmation.form = confirmationForm
/**
* @see \App\Http\Controllers\GpsTrackingController::tracking
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
export const tracking = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tracking.url(args, options),
    method: 'get',
})

tracking.definition = {
    methods: ["get","head"],
    url: '/tropiride/tracking/{booking}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GpsTrackingController::tracking
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
tracking.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { booking: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { booking: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    booking: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        booking: typeof args.booking === 'object'
                ? args.booking.id
                : args.booking,
                }

    return tracking.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GpsTrackingController::tracking
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
tracking.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tracking.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GpsTrackingController::tracking
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
tracking.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tracking.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GpsTrackingController::tracking
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
    const trackingForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: tracking.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GpsTrackingController::tracking
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
        trackingForm.get = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tracking.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GpsTrackingController::tracking
 * @see app/Http/Controllers/GpsTrackingController.php:182
 * @route '/tropiride/tracking/{booking}'
 */
        trackingForm.head = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tracking.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    tracking.form = trackingForm
const tropiride = {
    landing: Object.assign(landing, landing),
about: Object.assign(about, about),
contact: Object.assign(contact, contact),
faq: Object.assign(faq, faq),
privacy: Object.assign(privacy, privacy),
terms: Object.assign(terms, terms),
profile: Object.assign(profile, profile937a89),
messages: Object.assign(messages, messages),
vehicles: Object.assign(vehicles, vehicles),
booking: Object.assign(booking, booking99ab18),
ride: Object.assign(ride, ride),
bookings: Object.assign(bookings, bookings743b13),
confirmation: Object.assign(confirmation, confirmation),
tracking: Object.assign(tracking, tracking),
}

export default tropiride