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

  const [initialItems, setInitialItems] = useState([]);
  const [todayItems, setTodayItems] = useState([]);

  const [initialRecommendedRecipes, setInitialRecommendedRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    setTodayItems(items);
    setInitialItems(items);

    setInitialRecommendedRecipes(recommendedItems);
    setRecommendedRecipes(recommendedItems);
  }, []);


  const performSearch = (keyword) => {

    if (keyword == '') {
      console.log('keyword1',keyword);
      console.log(todayItems.length);
      setInitialItems(todayItems)
    }else{
      const lowerCaseKeyword = keyword.toLowerCase();
      const filteredItems = todayItems.filter(item => {
        const lowerCaseItemTitle = item.title.toLowerCase();
        if (lowerCaseItemTitle.includes(lowerCaseKeyword)) {
          return true;
        }
      })

      setInitialItems(filteredItems);
    }

  }

  const performLike = (item) => {
    const newItems = initialItems.map((itemElement) => {
      if (itemElement.id == item.id) {
        let liked = false;
        if (itemElement.liked) {
          liked = false;
        } else {
          liked = true;
        }

        return {
          ...itemElement,
          liked,
        };
      } else {
        return itemElement;
      }
    });

    setInitialItems(newItems);
    setTodayItems(newItems);
  };

  const performRecommendedLike = (item) => {

    const newItems = initialRecommendedRecipes.map((itemElement) => {
      if (itemElement.id == item.id) {
        let liked = false;
        if (itemElement.liked){
          liked = false
        }else{
          liked = true
        }

        return {
          ...itemElement,
          liked
        }
      }else{
        return itemElement;
      }
    })

    setInitialRecommendedRecipes(newItems);
    setRecommendedRecipes(newItems);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.innerContainer}>
          <View style={styles.topSection}>
            <View style={styles.leftSection}>
              <Image
                source={menuIcon}
                style={styles.menuIconStyle}
                resizeMode="contain"
              />
            </View>
            <View style={styles.rightSection}>
              <Image
                source={notificationIcon}
                style={styles.menuIconStyle}
                resizeMode="contain"
              />
              <View style={styles.alertIcon}></View>
            </View>
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.topText}>{DATA.greeting}</Text>
            <Text style={styles.bottomText}>{DATA.question}</Text>
          </View>

          <View style={styles.searchSection}>
            <View style={styles.searchBoxArea}>
              <View style={styles.searchIconArea}>
                <Image
                  style={styles.searchIcon}
                  source={searchIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={styles.searchText}
                placeholder="Search for recipes"
                placeholderTextColor={"#7B7B7B"}
                onChangeText={(text) => performSearch(text)}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.searchFilterArea}
            >
              <Image
                style={styles.filterIcon}
                source={filterIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.todaysSection}>
            <View style={styles.mainTextArea}>
              <Text style={styles.mainText}>
                {DATA.todayFreshRecipes.sectionTitle}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={styles.seeAllTextArea}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemSection}>
            <ScrollView horizontal={true}>
              {initialItems.map((element) => {
                return (
                  <View style={styles.itemPallet} key={element.id}>
                    <TouchableOpacity
                      style={styles.likeArea}
                      onPress={() => {
                        performLike(element);
                      }}
                    >
                      <Image
                        style={styles.likeIcon}
                        source={element.liked ? likedIcon : likeIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Image
                      style={styles.itemImage}
                      source={image01}
                      resizeMode="contain"
                    />

                    <View style={styles.itemInfoArea}>
                      <Text style={styles.type}>{element.type}</Text>
                      <Text style={styles.title}>{element.title}</Text>

                      <View style={styles.ratingArea}>
                        <Image style={styles.rating} source={star_active} />
                        <Image style={styles.rating} source={star_active} />
                        <Image style={styles.rating} source={star_active} />
                        <Image style={styles.rating} source={star_active} />
                        <Image style={styles.rating} source={star_active} />
                      </View>

                      <Text style={styles.calories}>
                        {element.calories} Calories
                      </Text>

                      <View style={styles.bottomTextArea}>
                        <View style={styles.timeArea}>
                          <Image style={styles.timeIcon} source={timeIcon} />
                          <Text style={styles.time}>{element.time}</Text>
                        </View>
                        <View style={styles.servingArea}>
                          <Image
                            style={styles.servingIcon}
                            source={servingIcon}
                          />
                          <Text style={styles.serving}>{element.servings}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.breakStyle}></View>

          <View style={styles.recommendedSection}>
            <View style={styles.mainTextArea}>
              <Text style={styles.mainText}>
                {DATA.recommendedRecipes.sectionTitle}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={styles.seeAllTextArea}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recommendedItemSection}>
            <ScrollView>
              {initialRecommendedRecipes.map((recommendedRecipe) => {
                return (
                  <View
                    style={styles.recommendedItem}
                    key={recommendedRecipe.id}
                  >
                    <View style={styles.recommendedItemImageArea}>
                      <Image
                        style={styles.recommendedItemImage}
                        source={image03}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.recommendedItemInfoArea}>
                      <TouchableOpacity
                        style={{ zIndex: 1000 }}
                        onPress={() => {
                          performRecommendedLike(recommendedRecipe)
                        }}
                      >
                        <Image
                          source={recommendedRecipe.liked ? likedIcon : likeIcon}
                          style={styles.recommendedItemLikeIcon}
                        />
                      </TouchableOpacity>
                      <Text style={styles.recommendedType}>
                        {recommendedRecipe.type}
                      </Text>
                      <Text style={styles.recommendedTitle}>
                        {recommendedRecipe.title}
                      </Text>

                      <View style={styles.recommendedRatingInfoArea}>
                        <View style={styles.recommendedRatingArea}>
                          <Image
                            style={styles.recommendedRating}
                            source={star_active}
                          />
                          <Image
                            style={styles.recommendedRating}
                            source={star_active}
                          />
                          <Image
                            style={styles.recommendedRating}
                            source={star_active}
                          />
                          <Image
                            style={styles.recommendedRating}
                            source={star_inactive}
                          />
                          <Image
                            style={styles.recommendedRating}
                            source={star_inactive}
                          />
                        </View>

                        <View style={styles.recommendedRatingArea}>
                          <Text style={styles.recommendedCalories}>
                            {recommendedRecipe.calories} Calories
                          </Text>
                        </View>
                      </View>

                      <View style={styles.recommendedBottomTextArea}>
                        <View style={styles.recommendedTimeArea}>
                          <Image
                            style={styles.recommendedTimeIcon}
                            source={timeIcon}
                          />
                          <Text style={styles.recommendedTime}>
                            {recommendedRecipe.time}
                          </Text>
                        </View>
                        <View style={styles.recommendedServingArea}>
                          <Image
                            style={styles.recommendedServingIcon}
                            source={servingIcon}
                          />
                          <Text style={styles.recommendedServing}>
                            {recommendedRecipe.servings}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
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
  innerContainer: {
    flex: 1,
    margin: 20,
  },
  topSection: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  menuIconStyle: {
    width: 23,
    height: 23,
  },
  alertIcon: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: "100%",
    backgroundColor: "red",
  },

  titleSection: {
    marginTop: 20,
  },
  topText: {
    fontSize: 14,
    color: "#7B7B7B",
    marginBottom: 8,
  },
  bottomText: {
    fontSize: 20,
    color: "white",
  },

  searchSection: {
    marginTop: 20,
    height: 40,
    flexDirection: "row",
  },
  searchBoxArea: {
    flex: 6,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B2B2B",
    borderRadius: 7,
    flexDirection: "row",
  },
  searchIconArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 15,
    height: 15,
  },
  searchText: {
    flex: 6,
    height: 35,
    color: "#FFFFFF",
  },
  searchFilterArea: {
    flex: 1,
    marginLeft: 6,
    borderRadius: 7,
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    width: 23,
  },

  todaysSection: {
    height: 30,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainTextArea: {
    width: 250,
    justifyContent: "center",
  },
  mainText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  seeAllTextArea: {
    width: 100,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  seeAllText: {
    color: "#F55A00",
  },

  itemSection: {
    marginTop: 10,
    width: "105%",
    height: 260,
    justifyContent: "center",
  },
  itemPallet: {
    width: 170,
    height: 250,
    padding: 12,
    marginRight: 50,
    borderRadius: 15,
    backgroundColor: "#2B2B2B",
  },
  likeArea: {
    zIndex: 1000,
  },
  likeIcon: {},
  itemImage: {
    position: "absolute",
    top: -100,
    left: 10,
    width: 200,
  },
  itemInfoArea: {
    marginTop: 95,
    height: 110,
  },
  type: {
    fontSize: 11,
    color: "#128FAE",
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    color: "white",
  },
  ratingArea: {
    marginTop: 6,
    flexDirection: "row",
  },
  rating: {
    width: 10,
    marginRight: 3,
  },
  calories: {
    marginTop: 6,
    fontSize: 9,
    color: "#F55A00",
  },
  bottomTextArea: {
    position: "absolute",
    bottom: 0,
    width: 145,
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  timeArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeIcon: {
    marginRight: 5,
  },
  time: {
    fontSize: 9,
    color: "#7B7B7B",
  },
  servingArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingIcon: {
    marginRight: 5,
  },
  serving: {
    fontSize: 9,
    color: "#7B7B7B",
  },
  breakStyle: {
    marginTop: 5,
    height: 0.5,
    backgroundColor: "#7B7B7B",
    opacity: 0.5,
  },

  recommendedSection: {
    height: 30,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recommendedItemSection: {
    marginTop: 5,
  },
  recommendedItem: {
    height: 100,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#2B2B2B",
    marginBottom: 10,
  },
  recommendedItemImageArea: {
    width: 100,
    height: 100,
    padding: 5,
    justifyContent: "center",
  },
  recommendedItemImage: {
    width: "100%",
  },
  recommendedItemInfoArea: {
    width: 290,
  },
  recommendedItemLikeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  recommendedType: {
    marginTop: 20,
    fontSize: 11,
    color: "#128FAE",
    marginBottom: 2,
  },
  recommendedTitle: {
    fontSize: 15,
    color: "white",
  },
  recommendedRatingInfoArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  recommendedRatingArea: {
    flexDirection: "row",
    marginRight: 10,
    marginTop: 4,
  },
  recommendedRating: {
    width: 10,
    marginRight: 2,
  },
  recommendedCalories: {
    marginTop: 2,
    fontSize: 9,
    color: "#F55A00",
  },

  recommendedBottomTextArea: {
    marginTop: 10,
    // justifyContent: "space-between",
    flexDirection: "row",
  },
  recommendedTimeArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  recommendedTimeIcon: {
    marginRight: 5,
  },
  recommendedTime: {
    fontSize: 9,
    color: "#7B7B7B",
  },
  recommendedServingArea: {
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center",
  },
  recommendedServingIcon: {
    marginRight: 5,
  },
  recommendedServing: {
    fontSize: 9,
    color: "#7B7B7B",
  },
});
