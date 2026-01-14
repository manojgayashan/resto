🍽️ Resto – Explore Restaurants on the Map

Resto is a modern React Native app that lets you discover restaurants in real-time, interact with dynamic maps, and explore locations effortlessly. Built with geolocation and interactive UI, it brings a realistic restaurant discovery experience right to your device.

⸻

🌟 Features
	•	Interactive Map Integration
Explore restaurants on a beautifully rendered map using react-native-maps.
	•	Real-Time Geolocation
Track your current location accurately and update the map dynamically.
	•	Location tracking automatically stops when leaving a screen to save battery and prevent background updates.
	•	Dynamic Mocked Restaurant Data
	•	Restaurants on the Restaurant Screen are mocked for demonstration.
	•	Their coordinates adjust dynamically based on your current location.
	•	When you change your location (via GPS or search), the restaurants move accordingly, simulating real-world behavior.
	•	Custom UI Components
	•	Scrollable restaurant cards with images and ratings
	•	Filters and sort options for a personalized experience
	•	Custom markers with optional shadows to highlight restaurant locations
	•	Smart Navigation Handling
	•	Stack navigation with proper screen unmounting to prevent map crashes
	•	Screens detach correctly to ensure MapView resets seamlessly when re-entered

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
	•	Their coordinates are relative to your current location.
	•	Changing the location (via GPS or search) moves the restaurants accordingly, creating a dynamic and realistic experience.
	•	This setup allows testing map markers and location-based UI without a live backend.

⸻

⚡ Notes
	•	MapView must render after the region is set to prevent blank or frozen maps.
	•	Screens are unmounted using unmountOnBlur and detachPreviousScreen to prevent memory leaks and map crashes.
	•	Optimized for smooth navigation and dynamic location updates.

⸻

📦 Dependencies
	•	react-native-maps
	•	@react-native-community/geolocation
	•	react-native-google-places-autocomplete
	•	@react-navigation/native & @react-navigation/native-stack

⸻

📝 Summary

Resto is a location-aware restaurant discovery app with mocked restaurants that dynamically update as you change location. It demonstrates efficient geolocation handling, dynamic map rendering, and smooth navigation, providing a solid foundation for building a production-ready location-based app.