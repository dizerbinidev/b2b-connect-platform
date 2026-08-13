import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Onboarding Store - Track user's tour progress
 *
 * Features:
 * - Persist completed tours to localStorage
 * - Support multiple tours per dashboard
 * - Step-by-step navigation
 */

const useOnboardingStore = create(
  persist(
    (set, get) => ({
      // State
      completedTours: [], // Array of tour IDs that user has completed
      currentTour: null, // Current active tour { id, steps, currentStep }
      isActive: false,

      // Check if a tour is completed
      isTourCompleted: (tourId) => {
        return get().completedTours.includes(tourId);
      },

      // Start a tour
      startTour: (tourId, steps) => {
        if (get().isTourCompleted(tourId)) {
          return false;
        }

        set({
          currentTour: {
            id: tourId,
            steps,
            currentStep: 0,
          },
          isActive: true,
        });
        return true;
      },

      // Go to next step
      nextStep: () => {
        const { currentTour } = get();
        if (!currentTour) return;

        const nextStep = currentTour.currentStep + 1;

        if (nextStep >= currentTour.steps.length) {
          // Tour completed
          get().completeTour();
        } else {
          set({
            currentTour: {
              ...currentTour,
              currentStep: nextStep,
            },
          });
        }
      },

      // Go to previous step
      prevStep: () => {
        const { currentTour } = get();
        if (!currentTour || currentTour.currentStep === 0) return;

        set({
          currentTour: {
            ...currentTour,
            currentStep: currentTour.currentStep - 1,
          },
        });
      },

      // Skip to specific step
      goToStep: (stepIndex) => {
        const { currentTour } = get();
        if (!currentTour) return;

        if (stepIndex >= 0 && stepIndex < currentTour.steps.length) {
          set({
            currentTour: {
              ...currentTour,
              currentStep: stepIndex,
            },
          });
        }
      },

      // Complete current tour
      completeTour: () => {
        const { currentTour, completedTours } = get();
        if (!currentTour) return;

        set({
          completedTours: [...completedTours, currentTour.id],
          currentTour: null,
          isActive: false,
        });
      },

      // Skip/dismiss current tour
      skipTour: () => {
        const { currentTour, completedTours } = get();
        if (!currentTour) return;

        // Mark as completed so it won't show again
        set({
          completedTours: [...completedTours, currentTour.id],
          currentTour: null,
          isActive: false,
        });
      },

      // Reset a specific tour (for testing)
      resetTour: (tourId) => {
        set({
          completedTours: get().completedTours.filter((id) => id !== tourId),
        });
      },

      // Reset all tours
      resetAllTours: () => {
        set({
          completedTours: [],
          currentTour: null,
          isActive: false,
        });
      },

      // Get current step data
      getCurrentStep: () => {
        const { currentTour } = get();
        if (!currentTour) return null;
        return currentTour.steps[currentTour.currentStep];
      },
    }),
    {
      name: 'b2b-connect-platform-onboarding',
      partialize: (state) => ({ completedTours: state.completedTours }),
    },
  ),
);

export default useOnboardingStore;
