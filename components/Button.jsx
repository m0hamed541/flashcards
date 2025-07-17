import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const Button = function ({
    title = "SUBMIT",
    onPress = () => {console.log("Button pressed");},
    isLoading = false,
    disabled = true,
}) {
    // Dynamic styling based on button state
    const getButtonStyle = () => {
        if (disabled && !isLoading) {
            return "bg-gray-400 rounded-lg p-4 my-4 flex-row items-center justify-center";
        } else if (isLoading) {
            return "bg-blue-400 rounded-lg p-4 my-4 flex-row items-center justify-center";
        } else {
            return "bg-blue-500 rounded-lg p-4 my-4 flex-row items-center justify-center";
        }
    };

    const getTextStyle = () => {
        if (disabled && !isLoading) {
            return "text-gray-600 font-medium";
        } else if (isLoading) {
            return "text-white font-medium";
        } else {
            return "text-white font-semibold";
        }
    };

    return (
        <TouchableOpacity
            className={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={disabled || isLoading ? 1 : 0.8}
        >
            {isLoading && (
                <ActivityIndicator 
                    size="small" 
                    color="#ffffff"
                    className="mr-2"
                />
            )}
            <Text className={getTextStyle()}>
                {isLoading ? "Saving..." : title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;