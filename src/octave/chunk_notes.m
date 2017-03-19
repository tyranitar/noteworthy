function [start_indices, finish_indices] = chunk_notes(y)
    num_samples = 500;
    num_decay = 7500;
    thresh_hi = 0.05;
    thresh_lo = 0.05;

    len = length(y);
    y_abs = abs(y);

    start_indices = [];
    finish_indices = [];

    mean_val = mean(y_abs(1:num_samples));
    finding_start = true; % Otherwise, finding the note finish point.
    decay_count = 0;

    % Base case.
    if mean_val > thresh_hi
        start_indices = vertcat(start_indices, 1);
        finding_start = false;
    end

    % Debug.
    mean_vals = zeros(len, 1);
    mean_vals(1) = mean_val;

    for i = 2:(len - num_samples)
        % Update mean.
        first_val = y_abs(i);
        new_val = y_abs(i + num_samples);
        mean_val = mean_val + (new_val - first_val) / num_samples;

        mean_vals(i) = mean_val; % Debug.

        if finding_start
            if mean_val > thresh_hi
                start_indices = vertcat(start_indices, i);
                finding_start = false;
            end
        else
            if mean_val < thresh_lo
                decay_count = decay_count + 1;

                if decay_count > num_decay
                    finish_indices = vertcat(finish_indices, i + num_samples);
                    finding_start = true;
                    decay_count = 0;
                end
            elseif decay_count > 0
                decay_count = 0;
            end
        end
    end

    if length(start_indices) > length(finish_indices)
        % Pop the last one, since it has no corresponding finish index.
        start_indices = start_indices(1:end - 1);
    end

    % hold; % Debug.
    % plot(y_abs); % Debug.
    % plot(mean_vals, 'g'); % Debug.
    %
    % % Debug
    % for i=1:length(start_indices)
    %     start_index = start_indices(i);
    %     finish_index = finish_indices(i);
    %
    %     vert_line(start_index, 1, 'r');
    %     vert_line(finish_index, 1, 'm');
    % end
end