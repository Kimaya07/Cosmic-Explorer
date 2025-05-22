// NASA API Service - handles all NASA API related calls

class NasaApiService {
    constructor() {
      this.baseUrl = 'https://api.nasa.gov/planetary';
      this.apiKey = import.meta.env.VITE_NASA_API_KEY || 'A42fQrehHvuqcEgd60Sy1a5BscuwJgnoIyne2VNM';
    }
  
    // Generate random dates for fetching APOD data
    generateRandomDates(count = 7) {
      const dates = [];
      const endDate = new Date();
      const startDate = new Date('1995-06-16'); // APOD started on this date
  
      for (let i = 0; i < count; i++) {
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        const randomDate = new Date(randomTime);
        const dateString = randomDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        dates.push(dateString);
      }
      return dates;
    }
  
    // Fetch single APOD entry for a specific date
    async fetchApodByDate(date) {
      try {
        const response = await fetch(
          `${this.baseUrl}/apod?api_key=${this.apiKey}&date=${date}`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        
        // Validate that we have the required data
        if (!data.explanation || (!data.url && !data.hdurl)) {
          throw new Error('Invalid APOD data received');
        }
  
        return {
          fact: data.explanation,
          image: data.hdurl || data.url,
          title: data.title,
          date: data.date,
          copyright: data.copyright || null
        };
      } catch (error) {
        console.error(`Error fetching APOD for date ${date}:`, error);
        throw error;
      }
    }
  
    // Fetch multiple APOD entries for random dates
    async fetchMultipleApodEntries(count = 10) {
      try {
        const dates = this.generateRandomDates(count);
        const promises = dates.map(date => this.fetchApodByDate(date));
  
        // Use Promise.allSettled to handle some failures gracefully
        const results = await Promise.allSettled(promises);
        
        // Filter successful results
        const successfulResults = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);
  
        if (successfulResults.length === 0) {
          throw new Error('No valid APOD data could be fetched');
        }
  
        return successfulResults;
      } catch (error) {
        console.error('Error fetching multiple APOD entries:', error);
        throw error;
      }
    }
  
    // Fetch recent APOD entries (alternative to random)
    async fetchRecentApodEntries(count = 7) {
      try {
        const dates = [];
        const today = new Date();
        
        for (let i = 0; i < count; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          dates.push(date.toISOString().split('T')[0]);
        }
  
        const promises = dates.map(date => this.fetchApodByDate(date));
        const results = await Promise.allSettled(promises);
        
        const successfulResults = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);
  
        if (successfulResults.length === 0) {
          throw new Error('No recent APOD data could be fetched');
        }
  
        return successfulResults;
      } catch (error) {
        console.error('Error fetching recent APOD entries:', error);
        throw error;
      }
    }
  
    // Get fallback data in case API fails
    getFallbackData() {
      return [
        {
          fact: "A neutron star is so dense that a teaspoon of its material would weigh about 4 billion tons on Earth.",
          image: "/api/placeholder/800/450",
          title: "Neutron Star Density",
          date: "fallback",
          copyright: null
        },
        {
          fact: "The largest known star, UY Scuti, is around 1,700 times larger than our Sun.",
          image: "/api/placeholder/800/450",
          title: "UY Scuti",
          date: "fallback",
          copyright: null
        },
        {
          fact: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
          image: "/api/placeholder/800/450",
          title: "Speed of Light",
          date: "fallback",
          copyright: null
        },
        {
          fact: "The Milky Way galaxy is estimated to contain 100-400 billion stars.",
          image: "/api/placeholder/800/450",
          title: "Milky Way Galaxy",
          date: "fallback",
          copyright: null
        },
        {
          fact: "Saturn's rings are mostly made up of ice particles, with a small amount of rocky debris and dust.",
          image: "/api/placeholder/800/450",
          title: "Saturn's Rings",
          date: "fallback",
          copyright: null
        }
      ];
    }
  }
  
  // Create and export a singleton instance
  const nasaApiService = new NasaApiService();
  export default nasaApiService;