function [Theta1, Theta2] = load_weights()
    weights_dir = '../../data/weights/';

    Theta1_path = strcat(weights_dir, 'theta_1.mat');
    Theta2_path = strcat(weights_dir, 'theta_2.mat');

    Theta1 = load(Theta1_path);
    Theta2 = load(Theta2_path);
end