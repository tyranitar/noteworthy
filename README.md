# Noteworthy

Noteworthy is an app that automatically transcibes audio waves into sheet music. Currently, it has the following features:

- A data pipeline that applies Fast Fourier Transform on audio waves to turn them into feature vectors.
- A simple neural network that uses the feature vectors and ground truth from MIDI files to predict notes.
- An Electron app that takes the output of the neural network to display sheet music.
