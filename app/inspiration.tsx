import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

const API_URL = 'https://dummyjson.com/quotes/random';

export default function InspirationScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data: Quote = await response.json();
      setQuote(data);
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Quote of the Day</Text>
        {quote && (
          <View style={styles.box}>
            <Text>{quote.quote}</Text>
            <Text>- {quote.author}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F5' },
  scroll: { padding: 20 },
  title: { fontSize: 22, fontWeight: '800' },
  box: { marginVertical: 20, padding: 16, backgroundColor: '#FFFFFF', borderRadius: 8 },
});
