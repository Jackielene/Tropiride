import Auth from './Auth'
import TropirideProfileController from './TropirideProfileController'
import RideRequestController from './RideRequestController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
TropirideProfileController: Object.assign(TropirideProfileController, TropirideProfileController),
RideRequestController: Object.assign(RideRequestController, RideRequestController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers