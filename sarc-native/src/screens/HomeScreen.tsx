import React, { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  AppState,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const C = {
  navy: "#011627",
  blue: "#140D4F",
  green: "#04724D",
  mint: "#2DD881",
  teal: "#2EC4B6",
  white: "#FFFFFF",
  paper: "#FDFFFC",
} as const;
const photos = {
  hero: [
    require("../../assets/sarc/12.jpg"),
    require("../../assets/sarc/3.jpg"),
    require("../../assets/sarc/4.jpg"),
  ],
  about: require("../../assets/sarc/5.jpg"),
  asmp: require("../../assets/sarc/1.jpg"),
  pmp: require("../../assets/sarc/6.jpg"),
  ilp: require("../../assets/sarc/23.jpg"),
  alumination: require("../../assets/sarc/32.jpg"),
  gallery1: require("../../assets/sarc/8.jpg"),
  gallery2: require("../../assets/sarc/3.jpg"),
};
const sites = {
  asmp: "https://asmp.sarc-iitb.org/",
  pmp: "https://pmp.sarc-iitb.org/",
  info: "https://acr.iitbombay.org/sarc/",
  sarc: "https://gymkhana.iitb.ac.in/instiapp//org/sarc",
  alumination: "https://alumination.sarc-iitb.org/",
  gallery: "https://alumination.sarc-iitb.org/gallery",
  sam: "https://sam-sarc-iitb.vercel.app/",
  shadow: "https://ntp.sarc-iitb.org/",
  yearbook: "https://yearbook.sarc-iitb.org/",
  instagram: "https://www.instagram.com/sarc_iitb/",
  acr: "https://acr.iitbombay.org/",
};
const open = async (url: string) => {
  if (await Linking.canOpenURL(url)) await Linking.openURL(url);
};

function Label({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          width: 22,
          height: 3,
          backgroundColor: light ? C.mint : C.green,
        }}
      />
      <Text
        style={{
          color: light ? C.white : C.navy,
          fontFamily: "Switzer600",
          fontSize: 13,
        }}
      >
        {children}
      </Text>
    </View>
  );
}
function Action({
  children,
  onPress,
  inverse = false,
}: {
  children: React.ReactNode;
  onPress: () => void;
  inverse?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        alignSelf: "flex-start",
        backgroundColor: inverse ? C.white : C.navy,
        borderRadius: 40,
        paddingLeft: 19,
        paddingRight: 8,
        paddingVertical: 8,
        opacity: pressed ? 0.82 : 1,
        minHeight: 48,
      })}
    >
      <Text
        style={{
          fontFamily: "Switzer600",
          color: inverse ? C.navy : C.white,
          fontSize: 13,
        }}
      >
        {children}
      </Text>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: C.mint,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: C.navy, fontSize: 20, lineHeight: 25 }}>↗</Text>
      </View>
    </Pressable>
  );
}
function TextLink({
  children,
  onPress,
  light = false,
}: {
  children: React.ReactNode;
  onPress: () => void;
  light?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="link"
      onPress={onPress}
      style={{
        alignSelf: "flex-start",
        borderBottomWidth: 1,
        borderColor: light ? C.white : C.green,
        paddingBottom: 5,
        marginTop: 16,
      }}
    >
      <Text
        style={{
          color: light ? C.white : C.green,
          fontFamily: "Switzer600",
          fontSize: 14,
        }}
      >
        {children} ↗
      </Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const inset = useSafeAreaInsets();
  const compact = width < 650;
  const tablet = width < 1050;
  const gutter = compact ? 20 : tablet ? 36 : 64;
  const contentWidth = Math.min(width - gutter * 2, 1440);
  const scroll = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [positions, setPositions] = useState<Record<string, number>>({});
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [opacity] = useState(() =>
    photos.hero.map((_, i) => new Animated.Value(i === 0 ? 1 : 0)),
  );
  const [fontsLoaded] = useFonts({
    Cabinet700: require("../../assets/fonts/cabinet-700-normal.ttf"),
    Cabinet800: require("../../assets/fonts/cabinet-800-normal.ttf"),
    Switzer400: require("../../assets/fonts/switzer-400-normal.ttf"),
    Switzer600: require("../../assets/fonts/switzer-600-normal.ttf"),
  });
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    const motion = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion,
    );
    const app = AppState.addEventListener("change", (state) =>
      setForeground(state === "active"),
    );
    return () => {
      motion.remove();
      app.remove();
    };
  }, []);
  useEffect(() => {
    if (paused || reduceMotion || !foreground) return;
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % photos.hero.length),
      3500,
    );
    return () => clearInterval(timer);
  }, [paused, reduceMotion, foreground]);
  useEffect(() => {
    Animated.parallel(
      opacity.map((value, i) =>
        Animated.timing(value, {
          toValue: slide === i ? 1 : 0,
          duration: reduceMotion ? 0 : 650,
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, [slide, reduceMotion, opacity]);
  const jump = (id: string) => {
    scroll.current?.scrollTo({
      y: id === "top" ? 0 : (positions[id] ?? 0),
      animated: !reduceMotion,
    });
    setMenu(false);
  };
  const record = (id: string) => ({
    onLayout: (e: any) => {
      const y = e.nativeEvent.layout.y;
      setPositions((previous) =>
        previous[id] === y ? previous : { ...previous, [id]: y },
      );
    },
  });
  const heading = (
    text: string,
    size = compact ? 42 : tablet ? 48 : 59,
    light = false,
  ) => (
    <Text
      style={{
        fontFamily: "Cabinet700",
        fontSize: size,
        lineHeight: size * 1.04,
        letterSpacing: -1.5,
        color: light ? C.white : C.navy,
      }}
    >
      {text}
    </Text>
  );
  const body = (text: string, light = false) => (
    <Text
      style={{
        fontFamily: "Switzer400",
        color: light ? C.white : C.navy,
        fontSize: 15,
        lineHeight: 24,
      }}
    >
      {text}
    </Text>
  );
  if (!fontsLoaded)
    return <View style={{ flex: 1, backgroundColor: C.paper }} />;

  return (
    <View style={{ flex: 1, backgroundColor: C.paper, paddingTop: inset.top }}>
      <ScrollView
        ref={scroll}
        contentContainerStyle={{ paddingBottom: inset.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: contentWidth,
            alignSelf: "center",
            minHeight: compact ? 80 : 104,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => jump("top")}
            accessibilityLabel="SARC home"
            accessibilityRole="button"
            style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
          >
            <Image
              source={require("../../assets/sarc/logo-navy.png")}
              resizeMode="contain"
              style={{ width: compact ? 75 : 94, height: compact ? 44 : 56 }}
            />
            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: "#01162733",
                paddingLeft: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Switzer600",
                  fontSize: compact ? 11 : 14,
                  color: C.navy,
                }}
              >
                IIT Bombay
              </Text>
              <Text
                style={{
                  fontFamily: "Switzer400",
                  fontSize: compact ? 9 : 12,
                  color: C.navy,
                }}
              >
                Student Alumni Relations Cell
              </Text>
            </View>
          </Pressable>
          {compact ? (
            <Pressable
              accessibilityLabel={menu ? "Close menu" : "Open menu"}
              accessibilityRole="button"
              onPress={() => setMenu(!menu)}
              style={{
                width: 44,
                height: 44,
                borderWidth: 1,
                borderColor: "#01162733",
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: C.navy, fontSize: 23 }}>
                {menu ? "×" : "≡"}
              </Text>
            </Pressable>
          ) : (
            <View
              style={{
                flexDirection: "row",
                gap: tablet ? 20 : 32,
                alignItems: "center",
              }}
            >
              {[
                ["Programs", "programs"],
                ["Events", "events"],
                ["About SARC", "about"],
              ].map(([name, id]) => (
                <Pressable key={id} onPress={() => jump(id)}>
                  <Text
                    style={{
                      color: C.navy,
                      fontFamily: "Switzer600",
                      fontSize: 14,
                    }}
                  >
                    {name}
                  </Text>
                </Pressable>
              ))}
              <Action onPress={() => jump("programs")}>Explore SARC</Action>
            </View>
          )}
        </View>
        {menu && (
          <View
            style={{
              marginHorizontal: 10,
              marginBottom: 10,
              padding: 20,
              backgroundColor: C.white,
              borderColor: "#01162733",
              borderWidth: 1,
              borderRadius: 12,
              gap: 16,
            }}
          >
            {[
              ["Programs", "programs"],
              ["Events", "events"],
              ["About SARC", "about"],
            ].map(([name, id]) => (
              <Pressable
                key={id}
                onPress={() => jump(id)}
                style={{ minHeight: 36 }}
              >
                <Text
                  style={{
                    color: C.navy,
                    fontFamily: "Switzer600",
                    fontSize: 18,
                  }}
                >
                  {name}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        <View
          {...record("top")}
          style={{
            marginHorizontal: compact ? 10 : 24,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: C.navy,
          }}
        >
          <View
            style={{
              height: compact ? 570 : tablet ? 610 : 650,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {photos.hero.map((source, i) => (
              <Animated.Image
                key={i}
                source={source}
                resizeMode="cover"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: opacity[i],
                }}
                accessibilityLabel={
                  [
                    "SARC gathering outdoors",
                    "SARC group on stage",
                    "Audience at a SARC event",
                  ][i]
                }
              />
            ))}
            <LinearGradient
              colors={["#01162700", "#01162755", "#011627E8"]}
              locations={[0, 0.45, 1]}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: compact ? 10 : 18,
                right: compact ? 10 : 18,
                bottom: compact ? 10 : 18,
                left: compact ? 10 : 18,
                borderColor: "#FFFFFF55",
                borderWidth: 1,
                borderRadius: 6,
              }}
            />
            <View
              style={{
                position: "absolute",
                left: compact ? 24 : 40,
                bottom: compact ? 115 : 114,
                right: 24,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: C.mint,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Switzer600",
                    color: C.white,
                    fontSize: compact ? 12 : 16,
                  }}
                >
                  Student Alumni Relations Cell
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Cabinet800",
                  color: C.white,
                  fontSize: compact
                    ? Math.min(width * 0.256, 100)
                    : tablet
                      ? 132
                      : 148,
                  lineHeight: compact ? 108 : tablet ? 135 : 150,
                  letterSpacing: -3,
                }}
              >
                SARC
              </Text>
              <Text
                style={{
                  fontFamily: "Switzer600",
                  color: C.white,
                  fontSize: compact ? 17 : 21,
                  lineHeight: compact ? 25 : 30,
                  marginTop: 10,
                  maxWidth: 480,
                }}
              >
                Mentorship, events and initiatives{compact ? " " : "\n"}for IIT
                Bombay students and alumni.
              </Text>
              <View style={{ marginTop: 25 }}>
                <Action inverse onPress={() => jump("programs")}>
                  Explore our initiatives
                </Action>
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 30,
                left: compact ? 24 : 40,
                right: compact ? 24 : 40,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Switzer400",
                  color: C.white,
                  fontSize: 11,
                  maxWidth: compact ? 90 : 200,
                }}
              >
                SARC gatherings & events
              </Text>
              <View style={{ flexDirection: "row", gap: 6 }}>
                {photos.hero.map((_, i) => (
                  <Pressable
                    key={i}
                    accessibilityLabel={`Show photo ${i + 1}`}
                    accessibilityRole="button"
                    onPress={() => setSlide(i)}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: i === slide ? C.mint : "#FFFFFF88",
                      backgroundColor: i === slide ? C.mint : "#01162788",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: i === slide ? C.navy : C.white,
                        fontFamily: "Switzer600",
                        fontSize: 11,
                      }}
                    >
                      0{i + 1}
                    </Text>
                  </Pressable>
                ))}
                <Pressable
                  accessibilityLabel={
                    paused ? "Play slideshow" : "Pause slideshow"
                  }
                  accessibilityRole="button"
                  onPress={() => setPaused(!paused)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#FFFFFF88",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: C.white, fontSize: 13 }}>
                    {paused ? "▶" : "Ⅱ"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: compact ? 24 : 40,
              flexDirection: compact ? "column" : "row",
              paddingVertical: compact ? 6 : 26,
            }}
          >
            {[
              ["Mentorship", "Alumni Student Mentorship"],
              ["On campus", "Upcoming events"],
              ["Explore SARC", "Programs & initiatives"],
            ].map(([tag, name], i) => (
              <Pressable
                key={i}
                onPress={() =>
                  i === 0
                    ? open(sites.asmp)
                    : jump(i === 1 ? "events" : "programs")
                }
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: compact ? 0 : 25,
                  paddingVertical: compact ? 15 : 2,
                  borderBottomWidth: compact && i < 2 ? 1 : 0,
                  borderRightWidth: !compact && i < 2 ? 1 : 0,
                  borderColor: "#FFFFFF33",
                }}
              >
                <View>
                  {!compact && (
                    <Text
                      style={{
                        color: C.teal,
                        fontFamily: "Switzer600",
                        fontSize: 11,
                        marginBottom: 3,
                      }}
                    >
                      {tag as string}
                    </Text>
                  )}
                  <Text
                    style={{
                      color: C.white,
                      fontFamily: "Switzer600",
                      fontSize: compact ? 15 : 17,
                    }}
                  >
                    {name as string}
                  </Text>
                </View>
                <Text style={{ color: C.mint, fontSize: 23 }}>↗</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View
          {...record("about")}
          style={{
            width: contentWidth,
            alignSelf: "center",
            paddingVertical: compact ? 45 : 70,
            flexDirection: compact ? "column" : "row",
            gap: compact ? 27 : 50,
            alignItems: "center",
            borderBottomColor: "#01162733",
            borderBottomWidth: 1,
          }}
        >
          <View style={{ width: compact ? "100%" : "44%" }}>
            <Image
              source={photos.about}
              resizeMode="cover"
              style={{
                width: "100%",
                height: compact ? 235 : 310,
                borderRadius: 12,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ color: C.navy, fontSize: 12 }}>
                Student and alumni interaction
              </Text>
              <Text style={{ color: C.navy, fontSize: 12 }}>IIT Bombay</Text>
            </View>
          </View>
          <View
            style={{ flex: 1, alignSelf: "stretch", justifyContent: "center" }}
          >
            <Label>About SARC</Label>
            <Text
              style={{
                fontFamily: "Cabinet700",
                fontSize: compact ? 32 : tablet ? 36 : 43,
                lineHeight: compact ? 37 : 49,
                letterSpacing: -1.1,
                color: C.navy,
              }}
            >
              SARC connects the students to the{" "}
              <Text style={{ color: C.green }}>alumni of IIT Bombay.</Text>
            </Text>
            <View style={{ marginTop: 20 }}>
              {body(
                "A student body working with the Dean ACR Office to bring students and alumni together through mentorship, events and initiatives throughout the year.",
              )}
            </View>
            <TextLink onPress={() => open(sites.info)}>
              More about SARC
            </TextLink>
          </View>
        </View>
        <View
          {...record("programs")}
          style={{
            width: contentWidth,
            alignSelf: "center",
            paddingVertical: compact ? 49 : 82,
          }}
        >
          <View
            style={{
              flexDirection: compact ? "column" : "row",
              justifyContent: "space-between",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {heading("Programs &\ninitiatives.")}
            <View
              style={{
                maxWidth: 310,
                alignSelf: compact ? "flex-start" : "flex-end",
              }}
            >
              {body(
                "Explore the official websites for mentorship, career preparation and student alumni engagement.",
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: compact ? "column" : "row",
              gap: compact ? 35 : 42,
            }}
          >
            <Pressable onPress={() => open(sites.asmp)} style={{ flex: 1.1 }}>
              <View style={{ position: "relative" }}>
                <Image
                  source={photos.asmp}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: compact ? 235 : 330,
                    borderRadius: 12,
                  }}
                />
                <Text
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    backgroundColor: C.white,
                    color: C.green,
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                    borderRadius: 20,
                    fontFamily: "Switzer600",
                    fontSize: 12,
                  }}
                >
                  Mentorship · ASMP
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Cabinet700",
                  color: C.navy,
                  fontSize: compact ? 30 : 34,
                  lineHeight: 35,
                  marginTop: 20,
                }}
              >
                Alumni Student{"\n"}Mentorship Program ↗
              </Text>
              <View style={{ marginTop: 10 }}>
                {body(
                  "A continuing dialogue between IIT Bombay students and alumni.",
                )}
              </View>
            </Pressable>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: "#01162733",
                  paddingTop: 20,
                  flexDirection: "row",
                  gap: 16,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: C.green,
                      fontFamily: "Switzer600",
                      fontSize: 12,
                    }}
                  >
                    Career preparation · PMP
                  </Text>
                  <Text
                    style={{
                      color: C.navy,
                      fontFamily: "Cabinet700",
                      fontSize: compact ? 28 : 31,
                      lineHeight: 32,
                      marginTop: 9,
                    }}
                  >
                    Placement{"\n"}Mentoring Program
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    {body(
                      "Alumni guidance for students preparing for placements.",
                    )}
                  </View>
                  <TextLink onPress={() => open(sites.pmp)}>Visit PMP</TextLink>
                </View>
                <Image
                  source={photos.pmp}
                  resizeMode="cover"
                  style={{
                    width: compact ? 100 : 138,
                    height: 150,
                    borderRadius: 8,
                  }}
                />
              </View>
              <View
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#01162733",
                  paddingVertical: 24,
                  flexDirection: "row",
                  gap: 16,
                  marginTop: 22,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: C.green,
                      fontFamily: "Switzer600",
                      fontSize: 12,
                    }}
                  >
                    Learning · ILP
                  </Text>
                  <Text
                    style={{
                      color: C.navy,
                      fontFamily: "Cabinet700",
                      fontSize: compact ? 28 : 31,
                      lineHeight: 32,
                      marginTop: 9,
                    }}
                  >
                    Industrial{"\n"}Learning Program
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    {body(
                      "Apply academic knowledge to projects shared by alumni.",
                    )}
                  </View>
                  <TextLink onPress={() => open(sites.sarc)}>
                    Program details
                  </TextLink>
                </View>
                <Image
                  source={photos.ilp}
                  resizeMode="cover"
                  style={{
                    width: compact ? 100 : 138,
                    height: 150,
                    borderRadius: 8,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#01162733",
              marginTop: 38,
              paddingTop: 26,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: C.navy,
                fontFamily: "Switzer600",
                fontSize: 13,
                marginRight: 8,
              }}
            >
              Also at SARC
            </Text>
            {[
              ["Student Alumni Meet", sites.sam],
              ["Shadow Program", sites.shadow],
              ["Yearbook", sites.yearbook],
              ["All initiatives", sites.sarc],
            ].map(([name, url]) => (
              <Pressable
                key={name}
                onPress={() => open(url)}
                style={{
                  borderWidth: 1,
                  borderColor: "#01162733",
                  borderRadius: 25,
                  paddingHorizontal: 15,
                  paddingVertical: 9,
                }}
              >
                <Text
                  style={{
                    color: C.navy,
                    fontFamily: "Switzer600",
                    fontSize: 12,
                  }}
                >
                  {name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View
          {...record("events")}
          style={{
            backgroundColor: C.green,
            marginHorizontal: compact ? 10 : 24,
            borderRadius: 12,
            paddingHorizontal: compact ? 20 : 40,
            paddingVertical: compact ? 36 : 55,
          }}
        >
          <View
            style={{
              flexDirection: compact ? "column" : "row",
              justifyContent: "space-between",
              alignItems: compact ? "flex-start" : "flex-end",
              gap: 14,
              marginBottom: 30,
            }}
          >
            {heading("Events at SARC.", compact ? 42 : 58, true)}
            <TextLink light onPress={() => open(sites.sarc)}>
              View the event calendar
            </TextLink>
          </View>
          <View
            style={{
              flexDirection: compact ? "column" : "row",
              gap: compact ? 30 : 65,
            }}
          >
            <Pressable
              onPress={() => open(sites.alumination)}
              style={{
                flex: 1,
                minHeight: compact ? 280 : 370,
                borderRadius: 8,
                overflow: "hidden",
                justifyContent: "flex-end",
              }}
            >
              <Image
                source={photos.alumination}
                resizeMode="cover"
                style={{ position: "absolute", width: "100%", height: "100%" }}
              />
              <LinearGradient
                colors={["#01162700", "#011627E0"]}
                style={{ position: "absolute", width: "100%", height: "100%" }}
              />
              <View style={{ padding: 25 }}>
                {heading("Alumination", compact ? 42 : 49, true)}
                <Text
                  style={{
                    fontFamily: "Switzer400",
                    color: C.white,
                    fontSize: 14,
                    marginTop: 8,
                  }}
                >
                  Explore the program, events and schedule.
                </Text>
              </View>
            </Pressable>
            <View
              style={{
                flex: 1.05,
                borderTopWidth: 1,
                borderTopColor: "#FFFFFF66",
              }}
            >
              {[
                [
                  "24",
                  "OCT 2026",
                  "Mock Interview &\nGroup Discussion",
                  "24 to 25 October · Lecture Hall Complex",
                ],
                [
                  "25",
                  "OCT 2026",
                  "Group Mentoring",
                  "10 am to 5 pm · Lecture Hall Complex",
                ],
              ].map(([day, date, title, detail]) => (
                <Pressable
                  key={day}
                  onPress={() => open(sites.sarc)}
                  style={{
                    flexDirection: "row",
                    gap: 18,
                    paddingVertical: 26,
                    borderBottomWidth: 1,
                    borderColor: "#FFFFFF66",
                  }}
                >
                  <View style={{ width: 62 }}>
                    <Text
                      style={{
                        color: C.white,
                        fontFamily: "Cabinet700",
                        fontSize: 40,
                        lineHeight: 40,
                      }}
                    >
                      {day}
                    </Text>
                    <Text style={{ color: C.white, fontSize: 11 }}>{date}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: C.white,
                        fontFamily: "Cabinet700",
                        fontSize: compact ? 24 : 27,
                        lineHeight: 29,
                      }}
                    >
                      {title}
                    </Text>
                    <Text
                      style={{
                        color: C.white,
                        fontFamily: "Switzer400",
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {detail}
                    </Text>
                  </View>
                  <Text style={{ color: C.mint, fontSize: 24 }}>↗</Text>
                </Pressable>
              ))}
              <Text
                style={{
                  color: C.white,
                  fontFamily: "Switzer400",
                  fontSize: 12,
                  lineHeight: 18,
                  marginTop: 22,
                }}
              >
                Event details and participation information are available on the
                official event listings.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: contentWidth,
            alignSelf: "center",
            paddingVertical: compact ? 50 : 84,
          }}
        >
          <View
            style={{
              flexDirection: compact ? "column" : "row",
              justifyContent: "space-between",
              alignItems: compact ? "flex-start" : "flex-end",
              marginBottom: 30,
            }}
          >
            {heading("From the gallery.")}
            <TextLink onPress={() => open(sites.gallery)}>
              View the gallery
            </TextLink>
          </View>
          <View style={{ flexDirection: compact ? "column" : "row", gap: 22 }}>
            {[
              [
                photos.gallery1,
                "Conversations with alumni",
                "SARC, IIT Bombay",
              ],
              [photos.gallery2, "Alumination", "IIT Bombay"],
            ].map(([source, caption, place], i) => (
              <View key={i} style={{ flex: i === 0 ? 1.4 : 1 }}>
                <Image
                  source={source as number}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: compact ? 230 : 300,
                    borderRadius: 12,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 11,
                  }}
                >
                  <Text style={{ color: C.navy, fontSize: 12 }}>
                    {caption as string}
                  </Text>
                  <Text style={{ color: C.navy, fontSize: 12 }}>
                    {place as string}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            backgroundColor: C.navy,
            paddingHorizontal: gutter,
            paddingTop: 45,
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: compact ? "column" : "row",
              justifyContent: "space-between",
              gap: 35,
            }}
          >
            <View>
              <Image
                source={require("../../assets/sarc/logo-white.png")}
                resizeMode="contain"
                style={{
                  width: compact ? 130 : 190,
                  height: compact ? 74 : 108,
                }}
              />
              <Text
                style={{
                  color: C.teal,
                  fontFamily: "Switzer400",
                  fontSize: 13,
                  marginTop: 16,
                }}
              >
                Student Alumni Relations Cell · IIT Bombay
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: compact ? 30 : 60 }}>
              <View>
                <Text
                  style={{
                    color: C.teal,
                    fontFamily: "Switzer600",
                    marginBottom: 15,
                  }}
                >
                  Explore
                </Text>
                {[
                  ["Programs & initiatives", "programs"],
                  ["Events", "events"],
                  ["About SARC", "about"],
                ].map(([name, id]) => (
                  <Pressable
                    key={id}
                    onPress={() => jump(id)}
                    style={{ paddingVertical: 5 }}
                  >
                    <Text style={{ color: C.white, fontSize: 13 }}>{name}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={{ maxWidth: 180 }}>
                <Text
                  style={{
                    color: C.teal,
                    fontFamily: "Switzer600",
                    marginBottom: 15,
                  }}
                >
                  Visit & connect
                </Text>
                <Text style={{ color: C.white, fontSize: 13, lineHeight: 23 }}>
                  SARC Room, Old SAC{"\n"}IIT Bombay, Powai{"\n"}Mumbai,
                  Maharashtra 400076
                </Text>
                <TextLink light onPress={() => open(sites.instagram)}>
                  Instagram
                </TextLink>
              </View>
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#FFFFFF33",
              marginTop: 35,
              paddingTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: C.white, fontSize: 11 }}>
              © 2026 SARC, IIT Bombay
            </Text>
            <Pressable onPress={() => open(sites.acr)}>
              <Text style={{ color: C.white, fontSize: 11 }}>
                Dean ACR Office ↗
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
