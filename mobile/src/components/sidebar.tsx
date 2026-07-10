import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';


export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPostingOpen, setIsPostingOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

if (isCollapsed) {
  return (
    <Pressable
      style={styles.floatingOpenButton}
      onPress={() => setIsCollapsed(false)}
    >
      <Ionicons name="menu" size={28} color="black" />
    </Pressable>
  );
}
  return (
  <ThemedView style={styles.sidebar}>
    <Pressable
        style={styles.collapseButton}
        onPress={() => setIsCollapsed(!isCollapsed)}
        >
        {!isCollapsed && <Ionicons
          name="chevron-back"
          size={24}
          color="#000"
        />}
    </Pressable>
   
    <Pressable
      style={styles.profileButton}
      onPress={() => router.push('/profile')}
    >
      <ThemedText>Profile</ThemedText>
    </Pressable>

    <Pressable
      style={[styles.navButton, pathname === '/home' && styles.navButtonActive]}
      onPress={() => router.push('/home')}
    >
      {!isCollapsed && <ThemedText>Discover</ThemedText>}
    </Pressable>

    <Pressable
      style={[
          styles.navButton,
          (pathname === '/postings' || pathname === '/postings-create') &&
          styles.navButtonActive,
      ]}
      onPress={() => setIsPostingOpen(!isPostingOpen)}
    >
      {!isCollapsed && (
          <ThemedView style={styles.navButtonContent}>
            <ThemedText>Posting Board</ThemedText>
            <ThemedText>{isPostingOpen ? '▼' : '▶'}</ThemedText>
          </ThemedView>
      )}
    </Pressable>

    {isPostingOpen && !isCollapsed && (
    <ThemedView style={styles.subNavContainer}>
      <ThemedView style={styles.subNavRow}>
        <ThemedView style={styles.subNavConnector} />
        <Pressable
          style={[
            styles.subNavButton,
            pathname === '/postings' && styles.navButtonActive,
          ]}
          onPress={() => router.push('/postings')}
        >
          {!isCollapsed && <ThemedText style={styles.subNavText}>View Postings</ThemedText>}
        </Pressable>
      </ThemedView>
       

      <ThemedView style={styles.subNavRow}>
        <ThemedView style={styles.subNavConnector} />
        <Pressable
          style={[
            styles.subNavButton,
            pathname === '/postings-create' && styles.navButtonActive,
          ]}
          onPress={() => router.push('/postings-create')}
        >
          {!isCollapsed && <ThemedText style={styles.subNavText}>Create Posting</ThemedText>}
        </Pressable>
      </ThemedView>
    </ThemedView>
    )}

    <Pressable
      style={[
          styles.navButton,
          (pathname === '/inbox' || pathname === '/inbox-activity') &&
          styles.navButtonActive,
      ]}
      onPress={() => setIsInboxOpen(!isInboxOpen)}
    >
      {!isCollapsed && (
          <ThemedView style={styles.navButtonContent}>
            <ThemedText>Inbox</ThemedText>
            <ThemedText>{isInboxOpen ? '▼' : '▶'}</ThemedText>
          </ThemedView>
      )}
    </Pressable>

    {isInboxOpen && !isCollapsed && (
    <ThemedView style={styles.subNavContainer}>
      <ThemedView style={styles.subNavRow}>
        <ThemedView style={styles.subNavConnector} />
        <Pressable
          style={[
            styles.subNavButton,
            pathname === '/inbox' && styles.navButtonActive,
          ]}
          onPress={() => router.push('/inbox')}
        >
          {!isCollapsed && <ThemedText style={styles.subNavText}>Direct Messages</ThemedText>}
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.subNavRow}>
        <ThemedView style={styles.subNavConnector} />
        <Pressable
          style={[
            styles.subNavButton,
            pathname === '/inbox-activity' && styles.navButtonActive,
          ]}
          onPress={() => router.push('/inbox-activity')}
        >
          {!isCollapsed && <ThemedText style={styles.subNavText}>Activity Chats</ThemedText>}
        </Pressable>
      </ThemedView>
    </ThemedView>
    )}

    <ThemedView style={styles.sidebarSpacer} />

    <Pressable
      style={[
        styles.navButton,
        pathname === '/settings' && styles.navButtonActive,
      ]}
      onPress={() => router.push('/settings')}
    >
      {!isCollapsed && <ThemedText>Settings</ThemedText>}
    </Pressable>
  </ThemedView>
);
}

const styles = StyleSheet.create({
sidebar: {
  top: 0,
  left: 0,
  bottom: 0,
  width: '45%',
  zIndex: 100,
  position: 'absolute',
  borderRightWidth: 1,
  borderColor: '#333',
  padding: Spacing.three,
  gap: Spacing.two,
  paddingTop: 48,
  paddingHorizontal: 12,
},
profileButton: {
  width: 78,
  height: 76,
  borderRadius: 36,
  borderWidth: 2,
  borderColor: '#000000',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: Spacing.three,
  alignSelf: 'center',
},
navButton: {
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 12,
},
navButtonActive: {
  borderWidth: 3,
  borderColor: '#d418d4',
}, 
subNavButton: {
  paddingVertical: 6,
  paddingHorizontal: 10,
},
sidebarSpacer: {
  flex: 1,
},
subNavContainer: {
  paddingLeft: 16,
  borderLeftWidth: 1,
  borderLeftColor: '#444',
  marginLeft: 8,
  gap: 4,
},
subNavText: {
  fontSize: 13,
  opacity: 0.8,
},
subNavRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
subNavConnector: {
  width: 20,
  height: 3,
  backgroundColor: '#e6dbdb',
  marginRight: 2,
},
floatingOpenButton: {
  position: 'absolute',
  top: 48,
  left: 12,
  width: 40,
  height: 40,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 200,
  backgroundColor: '#fff',
},
floatingOpenButtonText: {
  fontSize: 22,
  fontWeight: '700',
},
collapseButton: {
  alignSelf: 'center',
  width: 42,
  height: 32,
  borderWidth: 1,
  borderColor: '#555',
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: Spacing.five,
},
collapseButtonText: {
  fontSize: 35,
  fontWeight: '900',
  transform: [{ translateY: -6 }]
},
navButtonContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
});