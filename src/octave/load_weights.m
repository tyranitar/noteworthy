function [Theta1, Theta2] = load_weights(use_archived = false)
    weights_dir = '../../data/weights/';

    if use_archived
        weights_dir = '../../data/archives/weights/';
    end

    Theta1_path = strcat(weights_dir, 'theta_1.mat');
    Theta2_path = strcat(weights_dir, 'theta_2.mat');

    Theta1 = load(Theta1_path);
    Theta2 = load(Theta2_path);
end