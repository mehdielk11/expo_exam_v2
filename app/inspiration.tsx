import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../components/Loading';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

const API_URL = 'https://dummyjson.com/quotes/random';

export default function InspirationScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data: Quote = await response.json();
      setQuote(data);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="bulb" size={36} color="#111827" />
          </View>
          <Text style={styles.headerTitle}>Daily Inspiration</Text>
          <Text style={styles.headerSub}>A fresh quote, just for you.</Text>
        </View>

        {/* Content area */}
        <View style={styles.contentArea}>
          {loading && <Loading message="Fetching your quote..." />}

          {!loading && error && (
            <View style={styles.errorBox}>
              <Ionicons name="cloud-offline-outline" size={48} color="#6B7280" />
              <Text style={styles.errorTitle}>Could not load quote</Text>
              <Text style={styles.errorMsg}>{error}</Text>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={fetchQuote}
                activeOpacity={0.85}
                accessibilityLabel="Retry fetching quote"
              >
                <Ionicons name="refresh" size={18} color="#FFFFFF" />
                <Text style={styles.retryBtnText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading && !error && quote && (
            <View style={styles.quoteCard}>
              <Ionicons name="chatbubble-ellipses-outline" size={36} color="#F59E0B" style={styles.quoteIcon} />
              <Text style={styles.quoteText}>{quote.quote}</Text>
              <View style={styles.authorRow}>
                <View style={styles.authorDivider} />
                <Text style={styles.authorText}>{quote.author}</Text>
                <View style={styles.authorDivider} />
              </View>
              <View style={styles.quoteFooter}>
                <Ionicons name="bookmark-outline" size={14} color="#F59E0B" />
                <Text style={styles.quoteId}>Quote #{quote.id}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Refresh button */}
        {!loading && (
          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={fetchQuote}
            activeOpacity={0.85}
            accessibilityLabel="Get a new quote"
          >
            <Ionicons name="refresh-circle" size={22} color="#FFFFFF" />
            <Text style={styles.refreshBtnText}>Get New Quote</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.source}>Source: dummyjson.com</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F5' },
  scroll: { paddingBottom: 32, flexGrow: 1 },

  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 24,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FAF9F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: '#6B7280',
  },

  contentArea: {
    minHeight: 260,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },

  quoteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  quoteIcon: {
    marginBottom: 12,
    opacity: 0.7,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.2,
    marginBottom: 20,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  authorDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  authorText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D97706',
    letterSpacing: 0.5,
  },
  quoteFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  quoteId: {
    fontSize: 11,
    color: '#6B7280',
  },

  errorBox: {
    alignItems: 'center',
    backgroundColor: '#FAF9F5',
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 10,
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#374151',
  },
  errorMsg: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#111827',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginTop: 4,
    minHeight: 44,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F59E0B',
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    minHeight: 52,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  refreshBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  source: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 16,
  },
});
