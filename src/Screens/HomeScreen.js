import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const menuIcon = require("../images/icons/menu.png");
const notificationIcon = require("../images/icons/notification-icon.png");
const searchIcon = require("../images/icons/searchIcon.png");
const filterIcon = require("../images/icons/filterIcon.png");
const likeIcon = require("../images/icons/like.png");
const likedIcon = require("../images/icons/liked.png");
const star_active = require("../images/icons/star-active.png");
const star_inactive = require("../images/icons/star-inactive.png");

const timeIcon = require("../images/icons/time.png");
const servingIcon = require("../images/icons/serving.png");

const image01 = require("../images/items/Image01.png");
const image02 = require("../images/items/Image02.png");

const image03 = require("../images/items/Image03.png");
const image04 = require("../images/items/Image04.png");
const image05 = require("../images/items/Image05.png");

const DATA = require("../data/DATA.json");
const items = DATA.todayFreshRecipes.recipes;
const recommendedItems = DATA.recommendedRecipes.recipes;

const HomeScreen = () => {

  // const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010101",
  },
  safeArea: {
    flex: 1,
  },
});
