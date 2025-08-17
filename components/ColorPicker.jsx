import { TouchableOpacity, View } from "react-native";

const ColorPicker = function ({
  colors = [
    "#2196F3",
    "#4CAF50", 
    "#FF9800",
    "#E91E63",
    "#9C27B0",
    "#F44336",
    "#00BCD4",
    "#8BC34A",
    "#FFC107",
    "#795548",
  ],
  selectedColor = "#2196F3",
  onSelect = (color) => {
    //console.log("Selected color:", color);
  },
  itemsPerRow = 5,
}) {
  return (
    <View className="mb-4">
      <View className="flex-row flex-wrap">
        {colors.map((color, index) => (
          <TouchableOpacity
            key={color}
            className={`w-10 h-10 rounded-full m-1 ${
              selectedColor === color ? "border-2 border-gray-800" : "border border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            onPress={() => onSelect(color)}
          >
            {/* Inner circle for selected state */}
            {selectedColor === color && (
              <View className="flex-1 justify-center items-center">
                <View className="w-3 h-3 bg-white rounded-full opacity-90" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ColorPicker;