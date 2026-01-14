🍽️ Resto – Restaurant Discovery App

Resto is a React Native mobile application for discovering restaurants, viewing them on a map, and interacting with location-based features. The app uses dynamic map integration, geolocation, and mock restaurant data to demonstrate real-time location-based updates.

⸻

🛠 Features
	•	Dynamic Map Integration
Displays restaurants and the user’s location using react-native-maps.
	•	Geolocation Support
Tracks the user’s location in real-time and updates the map dynamically.
	•	Stops location updates when leaving a screen to save battery and prevent background updates.
	•	Restaurant Data
	•	Restaurants on the Restaurant Screen are mocked.
	•	Their coordinates are adjusted dynamically based on the current location.
	•	Changing the location (via search or GPS) moves the restaurants accordingly, simulating real-world location updates.
	•	Custom UI Components
	•	Scrollable restaurant cards
	•	Interactive filters and sort options
	•	Custom markers with optional shadows
	•	Navigation Management
	•	Stack navigation with proper unmounting to avoid map crashes and memory leaks.
	•	Screens detach properly to ensure MapView resets when re-entered.

⸻

💻 Installation
	1.	Clone the repository:

git clone https://github.com/YOUR_USERNAME/resto.git
cd resto

	2.	Install dependencies:

npm install
cd ios && pod install && cd ..

	3.	Run the app:

# Android
npx react-native run-android

# iOS
npx react-native run-ios


⸻

🗺 Restaurant Data Behavior

Important:
	•	All restaurants are mocked for demonstration purposes.
	•	Their coordinates are relative to the current location.
	•	Changing the location (via GPS or search) moves the restaurants accordingly, simulating dynamic map behavior.
	•	This allows testing of map markers and location-based UI without a live backend.

⸻

⚡ Notes
	•	MapView must always render after the region is set, otherwise it may appear blank or frozen.
	•	Screens are properly unmounted using unmountOnBlur and detachPreviousScreen to prevent memory leaks and map crashes.

⸻

📦 Dependencies
	•	react-native-maps
	•	@react-native-community/geolocation
	•	react-native-google-places-autocomplete
	•	@react-navigation/native & @react-navigation/native-stack

⸻

📝 Summary

Resto demonstrates a location-aware restaurant discovery app using React Native. The restaurants are mocked, but move dynamically with the user’s location to simulate a real-world experience. The app handles geolocation and map rendering efficiently, providing a strong foundation for building a production-ready location-based application.